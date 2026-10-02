require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const initSqlJs = require("sql.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── SQLite con sql.js (sin compilación nativa) ───────────
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "pedidos.db");

let db;

function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

async function initDb() {
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stripe_session_id TEXT UNIQUE,
      stripe_payment_intent TEXT,
      estado TEXT DEFAULT 'pendiente',
      nombre TEXT,
      telefono TEXT,
      direccion TEXT,
      codigo_postal TEXT,
      ciudad TEXT,
      provincia TEXT,
      email TEXT,
      producto TEXT DEFAULT 'PC + Montaje',
      precio_centavos INTEGER DEFAULT 49900,
      moneda TEXT DEFAULT 'eur',
      creado_en TEXT DEFAULT (datetime('now')),
      actualizado_en TEXT DEFAULT (datetime('now'))
    )
  `);
  saveDb();
  console.log("📦 Base de datos SQLite lista");
}

// Helpers SQL
function dbAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function dbGet(sql, params = []) {
  const rows = dbAll(sql, params);
  return rows[0] || null;
}

function dbRun(sql, params = []) {
  db.run(sql, params);
  saveDb();
}

// ─── Middleware ───────────────────────────────────────────
app.use(cors());

// Webhook ANTES de express.json()
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (webhookSecret) {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        event = JSON.parse(req.body.toString());
      }
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      dbRun(
        `UPDATE pedidos
         SET estado = 'pagado',
             stripe_payment_intent = ?,
             actualizado_en = datetime('now')
         WHERE stripe_session_id = ?`,
        [session.payment_intent || null, session.id]
      );
      console.log("✅ Pedido pagado: " + session.id);
    }

    res.json({ received: true });
  }
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ─── Config pública ───────────────────────────────────────
app.get("/api/config", (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
  });
});

// ─── Crear sesión Stripe Checkout ─────────────────────────
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const {
      deliveryName,
      deliveryPhone,
      deliveryAddress,
      deliveryPostal,
      deliveryCity,
      deliveryProvince,
      email,
    } = req.body;

    if (!deliveryName || deliveryName.length < 3) {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    if (!deliveryPhone || deliveryPhone.length < 9) {
      return res.status(400).json({ error: "Teléfono inválido" });
    }
    if (!deliveryAddress || deliveryAddress.length < 5) {
      return res.status(400).json({ error: "Dirección inválida" });
    }
    if (!/^\d{5}$/.test(deliveryPostal || "")) {
      return res.status(400).json({ error: "Código postal inválido" });
    }
    if (!deliveryCity || deliveryCity.length < 2) {
      return res.status(400).json({ error: "Ciudad inválida" });
    }
    if (!deliveryProvince || deliveryProvince.length < 2) {
      return res.status(400).json({ error: "Provincia inválida" });
    }

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      return res.status(500).json({
        error: "Stripe no está configurado. Añade STRIPE_SECRET_KEY en las variables de entorno.",
      });
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:" + PORT;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "PC + Montaje",
              description: "Pack personalizado - CastrOrdenadores",
            },
            unit_amount: 49900,
          },
          quantity: 1,
        },
      ],
      metadata: {
        deliveryName,
        deliveryPhone,
        deliveryAddress,
        deliveryPostal,
        deliveryCity,
        deliveryProvince,
      },
      success_url: baseUrl + "/?pago=ok&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: baseUrl + "/?pago=cancelado",
    });

    dbRun(
      "INSERT INTO pedidos (stripe_session_id, estado, nombre, telefono, direccion, codigo_postal, ciudad, provincia, email, producto, precio_centavos) VALUES (?, 'pendiente', ?, ?, ?, ?, ?, ?, ?, 'PC + Montaje', 49900)",
      [
        session.id,
        deliveryName,
        deliveryPhone,
        deliveryAddress,
        deliveryPostal,
        deliveryCity,
        deliveryProvince,
        email || null,
      ]
    );

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Error creando sesión Stripe:", err.message);
    res.status(500).json({ error: "Error al crear la sesión de pago: " + err.message });
  }
});

// ─── Estado de sesión ─────────────────────────────────────
app.get("/api/session-status/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    const pedido = dbGet(
      "SELECT * FROM pedidos WHERE stripe_session_id = ?",
      [req.params.sessionId]
    );
    res.json({ status: session.payment_status, pedido });
  } catch (err) {
    res.status(500).json({ error: "No se pudo verificar la sesión" });
  }
});

// ─── PANEL ADMIN /cirrosis ────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "castr2026";

function checkAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || auth !== "Bearer " + ADMIN_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
}

app.get("/cirrosis", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/api/admin/pedidos", checkAdmin, (req, res) => {
  const pedidos = dbAll("SELECT * FROM pedidos ORDER BY id DESC");
  res.json(pedidos);
});

app.patch("/api/admin/pedidos/:id", checkAdmin, (req, res) => {
  const { estado } = req.body;
  const allowed = ["pendiente", "pagado", "enviado", "cancelado", "completado"];
  if (!allowed.includes(estado)) {
    return res.status(400).json({ error: "Estado no válido" });
  }
  dbRun(
    "UPDATE pedidos SET estado = ?, actualizado_en = datetime('now') WHERE id = ?",
    [estado, req.params.id]
  );
  res.json({ ok: true });
});

app.delete("/api/admin/pedidos/:id", checkAdmin, (req, res) => {
  dbRun("DELETE FROM pedidos WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Arranque
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀 CastrOrdenadores en http://localhost:" + PORT);
      console.log("📊 Panel admin: http://localhost:" + PORT + "/cirrosis");
      console.log("🔑 Contraseña admin: " + ADMIN_PASSWORD);
    });
  })
  .catch((err) => {
    console.error("Error iniciando DB:", err);
    process.exit(1);
  });
