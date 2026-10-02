/* =====================================
   LOADER
===================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        if (loader) {

            loader.style.display = "none";

        }

    }, 3200);

});


/* =====================================
   CURSOR
===================================== */

const cursor =
    document.querySelector(".cursor");

const cursorBlur =
    document.querySelector(".cursor-blur");


document.addEventListener("mousemove", (e) => {

    if (cursor) {

        cursor.style.left =
            e.clientX + "px";

        cursor.style.top =
            e.clientY + "px";

    }


    if (cursorBlur) {

        cursorBlur.style.left =
            e.clientX + "px";

        cursorBlur.style.top =
            e.clientY + "px";

    }

});


/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(".section-reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =====================================
   CONTADORES
===================================== */

const counters =
    document.querySelectorAll("[data-target]");


const counterObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting)
                    return;


                const counter =
                    entry.target;


                const target =
                    parseInt(
                        counter.dataset.target
                    );


                let current = 0;


                const duration = 1200;

                const increment =
                    target /
                    (duration / 20);


                const updateCounter = () => {

                    current += increment;


                    if (current >= target) {

                        counter.textContent =
                            target;

                        return;

                    }


                    counter.textContent =
                        Math.floor(current);


                    requestAnimationFrame(
                        updateCounter
                    );

                };


                updateCounter();


                observer.unobserve(counter);

            });

        },

        {
            threshold: .6
        }

    );


counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/* =====================================
   LOGIN
===================================== */

function abrirLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );

    modal.classList.add("active");

}


function cerrarLogin() {

    const modal =
        document.getElementById(
            "loginModal"
        );

    modal.classList.remove("active");

}


function iniciarSesion() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const message =
        document.getElementById(
            "login-message"
        );


    if (!email || !password) {

        message.style.color =
            "#ff6b6b";

        message.textContent =
            "Completa todos los campos.";

        return;

    }


    message.style.color =
        "#64ff9a";


    message.textContent =
        "Inicio de sesión simulado correctamente.";

}


/* =====================================
   ANALYTICS
===================================== */

let clicks = 0;


function registrarClic() {

    clicks++;


    const counter =
        document.getElementById(
            "contador"
        );


    counter.textContent =
        clicks;

}


/* =====================================
   FORMULARIO CONTACTO
===================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();


            const message =
                document.getElementById(
                    "form-message"
                );


            message.textContent =
                "Mensaje enviado correctamente.";


            contactForm.reset();

        }
    );

}


/* =====================================
   MODAL DE PAGO
===================================== */

function abrirPago() {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    modal.classList.add("active");

}


function cerrarPago() {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    modal.classList.remove("active");

}


/* =====================================
   NUMERO DE TARJETA
===================================== */

const cardNumber =
    document.getElementById(
        "cardNumber"
    );


const visualCardNumber =
    document.getElementById(
        "visualCardNumber"
    );


const cardType =
    document.getElementById(
        "cardType"
    );


const visualCardType =
    document.getElementById(
        "visualCardType"
    );


if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        () => {

            let value =
                cardNumber.value
                    .replace(/\D/g, "")
                    .substring(0, 16);


            let formatted = "";


            for (
                let i = 0;
                i < value.length;
                i++
            ) {

                if (
                    i > 0 &&
                    i % 4 === 0
                ) {

                    formatted += " ";

                }


                formatted += value[i];

            }


            cardNumber.value =
                formatted;


            if (value.length > 0) {

                visualCardNumber.textContent =
                    formatted.padEnd(
                        19,
                        "•"
                    );

            } else {

                visualCardNumber.textContent =
                    "•••• •••• •••• ••••";

            }


            /* DETECTAR TARJETA */

            if (
                value.startsWith("4")
            ) {

                cardType.textContent =
                    "VISA";


                visualCardType.textContent =
                    "VISA";

            }

            else if (
                value.startsWith("5") ||
                value.startsWith("2")
            ) {

                cardType.textContent =
                    "MC";


                visualCardType.textContent =
                    "MASTERCARD";

            }

            else if (
                value.startsWith("3")
            ) {

                cardType.textContent =
                    "AMEX";


                visualCardType.textContent =
                    "AMEX";

            }

            else {

                cardType.textContent =
                    "CARD";


                visualCardType.textContent =
                    "CARD";

            }

        }
    );

}


/* =====================================
   NOMBRE TARJETA
===================================== */

const cardName =
    document.getElementById(
        "cardName"
    );


const visualCardName =
    document.getElementById(
        "visualCardName"
    );


if (cardName) {

    cardName.addEventListener(
        "input",
        () => {

            if (
                cardName.value.trim() === ""
            ) {

                visualCardName.textContent =
                    "TITULAR DE LA TARJETA";

            }

            else {

                visualCardName.textContent =
                    cardName.value
                        .toUpperCase()
                        .substring(
                            0,
                            25
                        );

            }

        }
    );

}


/* =====================================
   FECHA DE CADUCIDAD
===================================== */

const cardExpiry =
    document.getElementById(
        "cardExpiry"
    );


const visualCardExpiry =
    document.getElementById(
        "visualCardExpiry"
    );


if (cardExpiry) {

    cardExpiry.addEventListener(
        "input",
        () => {

            let value =
                cardExpiry.value
                    .replace(/\D/g, "")
                    .substring(0, 4);


            if (value.length >= 3) {

                value =
                    value.substring(0, 2)
                    + "/"
                    + value.substring(2);

            }


            cardExpiry.value =
                value;


            visualCardExpiry.textContent =
                value || "MM/AA";

        }
    );

}


/* =====================================
   CVV
===================================== */

const cardCvv =
    document.getElementById(
        "cardCvv"
    );


if (cardCvv) {

    cardCvv.addEventListener(
        "input",
        () => {

            cardCvv.value =
                cardCvv.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

        }
    );

}


/* =====================================
   CODIGO POSTAL
===================================== */

const deliveryPostal =
    document.getElementById(
        "deliveryPostal"
    );


if (deliveryPostal) {

    deliveryPostal.addEventListener(
        "input",
        () => {

            deliveryPostal.value =
                deliveryPostal.value
                    .replace(/\D/g, "")
                    .substring(0, 5);

        }
    );

}


/* =====================================
   TELEFONO
===================================== */

const deliveryPhone =
    document.getElementById(
        "deliveryPhone"
    );


if (deliveryPhone) {

    deliveryPhone.addEventListener(
        "input",
        () => {

            deliveryPhone.value =
                deliveryPhone.value
                    .replace(/[^\d\s+]/g, "")
                    .substring(0, 15);

        }
    );

}


/* =====================================
   PAGO CON STRIPE
===================================== */

const paymentForm =
    document.getElementById(
        "paymentForm"
    );


if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            const deliveryName =
                document.getElementById(
                    "deliveryName"
                ).value.trim();


            const deliveryPhone =
                document.getElementById(
                    "deliveryPhone"
                ).value.trim();


            const deliveryAddress =
                document.getElementById(
                    "deliveryAddress"
                ).value.trim();


            const deliveryPostal =
                document.getElementById(
                    "deliveryPostal"
                ).value.trim();


            const deliveryCity =
                document.getElementById(
                    "deliveryCity"
                ).value.trim();


            const deliveryProvince =
                document.getElementById(
                    "deliveryProvince"
                ).value.trim();


            const emailInput =
                document.getElementById(
                    "deliveryEmail"
                );


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const message =
                document.getElementById(
                    "payment-message"
                );


            /* Validar entrega */
            if (deliveryName.length < 3) {
                mostrarError("Introduce el nombre y apellidos.");
                return;
            }
            if (deliveryPhone.length < 9) {
                mostrarError("Introduce un número de teléfono válido.");
                return;
            }
            if (deliveryAddress.length < 5) {
                mostrarError("Introduce una dirección de entrega.");
                return;
            }
            if (!/^\d{5}$/.test(deliveryPostal)) {
                mostrarError("El código postal debe tener 5 números.");
                return;
            }
            if (deliveryCity.length < 2) {
                mostrarError("Introduce la ciudad de entrega.");
                return;
            }
            if (deliveryProvince.length < 2) {
                mostrarError("Introduce la provincia.");
                return;
            }


            const button =
                paymentForm.querySelector(
                    ".confirm-payment"
                );


            button.disabled = true;


            button.innerHTML =
                `
                <span>
                    Redirigiendo a Stripe...
                </span>
                <strong>
                    ...
                </strong>
                `;


            message.style.color = "#9b6cff";
            message.textContent =
                "Creando sesión de pago segura...";


            try {

                const res = await fetch(
                    "/api/create-checkout-session",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            deliveryName,
                            deliveryPhone,
                            deliveryAddress,
                            deliveryPostal,
                            deliveryCity,
                            deliveryProvince,
                            email
                        })
                    }
                );


                const data = await res.json();


                if (!res.ok) {
                    throw new Error(
                        data.error ||
                        "Error al crear el pago"
                    );
                }


                // Redirigir a Stripe Checkout
                window.location.href =
                    data.url;

            } catch (err) {

                console.error(err);

                message.style.color =
                    "#ff6b6b";

                message.textContent =
                    err.message ||
                    "Error al conectar con el servidor de pagos.";

                button.disabled = false;

                button.innerHTML =
                    `
                    <span>
                        Confirmar pedido
                    </span>
                    <strong>
                        499,00 €
                    </strong>
                    `;

            }

        }
    );

}


/* =====================================
   ERROR PAGO
===================================== */

function mostrarError(texto) {

    const message =
        document.getElementById(
            "payment-message"
        );


    message.style.color =
        "#ff6b6b";


    message.textContent =
        texto;

}


/* =====================================
   MENSAJE TRAS PAGO STRIPE
===================================== */

(function checkPagoReturn() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const pago =
        params.get("pago");


    if (pago === "ok") {

        // Mostrar mensaje de éxito
        setTimeout(() => {

            alert(
                "✓ ¡Pago realizado correctamente!\n\nRecibirás un correo de confirmación y procesaremos tu pedido."
            );


            // Limpiar URL
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

        }, 800);

    }


    if (pago === "cancelado") {

        setTimeout(() => {

            alert(
                "Pago cancelado. Puedes intentarlo de nuevo cuando quieras."
            );


            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

        }, 800);

    }

})();


/* =====================================
   CERRAR MODALES FUERA
===================================== */

document.addEventListener(
    "click",
    (e) => {

        const loginModal =
            document.getElementById(
                "loginModal"
            );


        const paymentModal =
            document.getElementById(
                "paymentModal"
            );


        if (
            e.target === loginModal
        ) {

            cerrarLogin();

        }


        if (
            e.target === paymentModal
        ) {

            cerrarPago();

        }

    }
);


/* =====================================
   ESC
===================================== */

document.addEventListener(
    "keydown",
    (e) => {

        if (
            e.key === "Escape"
        ) {

            cerrarLogin();

            cerrarPago();

        }

    }
);


/* =====================================
   EFECTO 3D TARJETAS
===================================== */

const cards =
    document.querySelectorAll(
        ".tilt-card"
    );


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                e.clientX - rect.left;


            const y =
                e.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 20;


            const rotateY =
                (centerX - x) / 20;


            card.style.transform =
                `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =====================================
   PARALLAX HERO
===================================== */

window.addEventListener(
    "scroll",
    () => {

        const hero =
            document.querySelector(
                ".hero-content"
            );


        if (!hero)
            return;


        const scroll =
            window.scrollY;


        if (
            scroll < 700
        ) {

            hero.style.transform =
                `translateY(${scroll * .12}px)`;

        }

    }
);