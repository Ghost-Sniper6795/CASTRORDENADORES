# CastrOrdenadores — Tienda + Stripe + SQLite + Panel Admin

Tienda con pago real por **Stripe Checkout**, base de datos **SQLite** y panel de pedidos en **`/cirrosis`**.

---

## 1. Qué hace

- El cliente rellena **datos de entrega** en el modal.
- Al pulsar **“Pagar con Stripe”** se crea una sesión de Checkout.
- Stripe cobra la tarjeta (modo test o live).
- El pedido se guarda en SQLite (`pendiente` → `pagado` cuando llega el webhook).
- Tú ves y gestionas los pedidos en **`https://tu-dominio.onrender.com/cirrosis`**.

---

## 2. Claves de Stripe (paso a paso)

1. Entra en [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) y crea cuenta.
2. Activa el **modo de prueba** (toggle “Test mode” arriba a la derecha).
3. Ve a **Developers → API keys**:
   - **Publishable key** → `pk_test_...` → variable `STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `sk_test_...` → variable `STRIPE_SECRET_KEY`
4. (Producción) Cuando quieras cobrar de verdad, desactiva Test mode y usa las claves `pk_live_` / `sk_live_`.

### Webhook (recomendado en Render)

1. **Developers → Webhooks → Add endpoint**
2. URL: `https://TU-APP.onrender.com/api/webhook`
3. Evento a escuchar: `checkout.session.completed`
4. Copia el **Signing secret** (`whsec_...`) → variable `STRIPE_WEBHOOK_SECRET`

Sin webhook el pedido se crea como `pendiente`. Con webhook pasa a `pagado` automáticamente.

---

## 3. Probar en local

```bash
cd castrordenadores
cp .env.example .env
# Edita .env y pega tus claves de Stripe

npm install
npm start
```

Abre:

- Tienda: http://localhost:3000
- Panel: http://localhost:3000/cirrosis  
  Contraseña por defecto: `castr2026` (cámbiala en `.env`)

Tarjetas de prueba Stripe:

| Número            | Resultado   |
|-------------------|-------------|
| 4242 4242 4242 4242 | Pago OK   |
| 4000 0000 0000 0002 | Rechazado |

Fecha cualquiera futura, CVV cualquiera (ej. 123).

---

## 4. Desplegar en Render (gratis)

### A) Crear el servicio

1. Sube el proyecto a **GitHub** (crea un repo e incluye la carpeta `castrordenadores`).
2. Entra en [https://dashboard.render.com](https://dashboard.render.com) → **New → Web Service**.
3. Conecta el repositorio de GitHub.
4. Configuración:
   - **Name**: `castrordenadores` (o el que quieras)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance type**: Free

### B) Variables de entorno (Environment)

En la pestaña **Environment** añade:

| Key                      | Value                                      |
|--------------------------|--------------------------------------------|
| `STRIPE_SECRET_KEY`      | `sk_test_...` o `sk_live_...`              |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` o `pk_live_...`              |
| `STRIPE_WEBHOOK_SECRET`  | `whsec_...` (después de crear el webhook)  |
| `BASE_URL`               | `https://TU-APP.onrender.com`              |
| `ADMIN_PASSWORD`         | Una contraseña fuerte                      |
| `NODE_VERSION`           | `20`                                       |

### C) Disco persistente (importante para SQLite)

En el plan **Free** el sistema de archivos se borra al reiniciar.  
Opciones:

1. **Plan Starter** (€7/mes) → añade un **Persistent Disk** montado en `/opt/render/project/src/data`.
2. O migra a **PostgreSQL** (Render ofrece uno gratis) y cambia el código de SQLite a Postgres.

Si no añades disco, los pedidos se perderán cada vez que Render reinicie el servicio (suele ser cada poco tiempo en free).

### D) Webhook en producción

Cuando la app esté en línea:

1. Stripe Dashboard → Webhooks → Add endpoint  
   `https://TU-APP.onrender.com/api/webhook`
2. Evento: `checkout.session.completed`
3. Copia el `whsec_...` y pégalo en las variables de entorno de Render.
4. Redeploy.

---

## 5. Panel de administración

URL: `https://tu-dominio/cirrosis`

- Login con la contraseña de `ADMIN_PASSWORD`
- Ver todos los pedidos, cambiar estado (pendiente / pagado / enviado / completado / cancelado)
- Borrar pedidos
- Resumen de ingresos

---

## 6. Estructura del proyecto

```
castrordenadores/
├── server.js          # Express + SQLite + Stripe
├── package.json
├── .env.example
├── data/              # pedidos.db (se crea solo)
└── public/
    ├── index.html
    ├── style.css
    ├── script.js
    └── admin.html     # Panel /cirrosis
```

---

## 7. Seguridad

- **Nunca** subas el archivo `.env` a GitHub.
- La contraseña del panel va por header `Authorization: Bearer ...` (simple, suficiente para un panel privado).
- Stripe nunca recibe ni guarda datos de tarjeta en tu servidor: todo el pago ocurre en su página.
- Cambia `ADMIN_PASSWORD` por algo fuerte antes de poner la web en producción.

---

## 8. Tarjetas de prueba (modo test)

| Número              | Uso                |
|---------------------|--------------------|
| 4242 4242 4242 4242 | Pago correcto      |
| 4000 0000 0000 9995 | Fondos insuficientes |
| 4000 0025 0000 3155 | Requiere 3D Secure |

Cualquier fecha futura + cualquier CVC de 3 dígitos.

---

¿Dudas? Revisa los logs de Render o la consola de Stripe Dashboard → Payments / Logs.
