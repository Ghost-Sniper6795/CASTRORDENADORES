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
   PAGO SIMULADO
===================================== */

const paymentForm =
    document.getElementById(
        "paymentForm"
    );


if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();


            /* =========================
               DATOS DE ENTREGA
            ========================= */

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


            /* =========================
               DATOS TARJETA
            ========================= */

            const name =
                document.getElementById(
                    "cardName"
                ).value.trim();


            const number =
                document.getElementById(
                    "cardNumber"
                ).value
                    .replace(/\s/g, "");


            const expiry =
                document.getElementById(
                    "cardExpiry"
                ).value;


            const cvv =
                document.getElementById(
                    "cardCvv"
                ).value;


            const message =
                document.getElementById(
                    "payment-message"
                );


            /* =========================
               VALIDAR ENTREGA
            ========================= */

            if (
                deliveryName.length < 3
            ) {

                mostrarError(
                    "Introduce el nombre y apellidos."
                );

                return;

            }


            if (
                deliveryPhone.length < 9
            ) {

                mostrarError(
                    "Introduce un número de teléfono válido."
                );

                return;

            }


            if (
                deliveryAddress.length < 5
            ) {

                mostrarError(
                    "Introduce una dirección de entrega."
                );

                return;

            }


            if (
                !/^\d{5}$/.test(
                    deliveryPostal
                )
            ) {

                mostrarError(
                    "El código postal debe tener 5 números."
                );

                return;

            }


            if (
                deliveryCity.length < 2
            ) {

                mostrarError(
                    "Introduce la ciudad de entrega."
                );

                return;

            }


            if (
                deliveryProvince.length < 2
            ) {

                mostrarError(
                    "Introduce la provincia."
                );

                return;

            }


            /* =========================
               VALIDAR TARJETA
            ========================= */

            if (
                name.length < 3
            ) {

                mostrarError(
                    "Introduce el nombre del titular."
                );

                return;

            }


            if (
                number.length !== 16
            ) {

                mostrarError(
                    "El número de tarjeta debe tener 16 dígitos."
                );

                return;

            }


            if (
                !/^\d{2}\/\d{2}$/.test(
                    expiry
                )
            ) {

                mostrarError(
                    "Introduce una fecha de caducidad válida."
                );

                return;

            }


            if (
                cvv.length < 3
            ) {

                mostrarError(
                    "El CVV debe tener 3 o 4 dígitos."
                );

                return;

            }


            /* =========================
               PROCESANDO
            ========================= */

            const button =
                paymentForm.querySelector(
                    ".confirm-payment"
                );


            button.disabled = true;


            button.innerHTML =
                `
                <span>
                    Procesando pedido...
                </span>

                <strong>
                    ...
                </strong>
                `;


            message.style.color =
                "#9b6cff";


            message.textContent =
                "Comprobando dirección y datos de pago...";


            /* =========================
               SIMULAR PAGO
            ========================= */

            setTimeout(() => {

                message.style.color =
                    "#64ff9a";


                message.innerHTML =
                    `
                    ✓ Pedido realizado correctamente.<br>
                    <small>
                        El pedido será enviado a:
                        ${deliveryCity}
                    </small>
                    `;


                button.innerHTML =
                    `
                    <span>
                        ✓ Compra completada
                    </span>

                    <strong>
                        OK
                    </strong>
                    `;


                button.style.background =
                    "#267a4b";


                /*
                    IMPORTANTE:

                    Esto es solamente una simulación.
                    No se envían ni almacenan
                    datos de tarjetas.
                */


                /* =========================
                   LIMPIAR DESPUES
                ========================= */

                setTimeout(() => {

                    paymentForm.reset();


                    document.getElementById(
                        "visualCardNumber"
                    ).textContent =
                        "•••• •••• •••• ••••";


                    document.getElementById(
                        "visualCardName"
                    ).textContent =
                        "TITULAR DE LA TARJETA";


                    document.getElementById(
                        "visualCardExpiry"
                    ).textContent =
                        "MM/AA";


                    document.getElementById(
                        "cardType"
                    ).textContent =
                        "CARD";


                    document.getElementById(
                        "visualCardType"
                    ).textContent =
                        "CARD";


                    button.disabled =
                        false;


                    button.style.background =
                        "";


                    button.innerHTML =
                        `
                        <span>
                            Confirmar pedido
                        </span>

                        <strong>
                            499,00 €
                        </strong>
                        `;


                    message.textContent =
                        "";

                }, 3500);


            }, 2000);

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

/* ===== ACCESIBILIDAD, IDIOMAS Y REPRODUCTOR MULTIPLATAFORMA ===== */
(() => {
  const translations = {'en': {'Preparando tu experiencia...': 'Preparing your experience...', 'Inicio': 'Home', 'Productos': 'Products', 'Servicios': 'Services', 'Productos + Servicios': 'Products + Services', 'Contacto': 'Contact', 'Mi cuenta': 'My account', 'SISTEMAS ONLINE': 'SYSTEMS ONLINE', 'TECNOLOGÍA • PRODUCTOS • SERVICIOS': 'TECHNOLOGY • PRODUCTS • SERVICES', 'Tecnología para': 'Technology for', 'lo que necesites.': 'whatever you need.', 'Ordenadores, componentes, periféricos y servicios informáticos para particulares y empresas.': 'Computers, components, peripherals and IT services for individuals and businesses.', 'Ver productos': 'View products', 'Ver servicios': 'View services', 'PRODUCTOS': 'PRODUCTS', 'SERVICIOS': 'SERVICES', 'SOPORTE': 'SUPPORT', 'SOLUCIONES': 'SOLUTIONS', 'UPTIME': 'UPTIME', 'Todo lo que necesitas.': 'Everything you need.', 'Componentes y equipos informáticos preparados para cualquier tipo de usuario.': 'Computer components and equipment for every type of user.', 'Ordenadores': 'Computers', 'PCs gaming, equipos de oficina, estaciones de trabajo y ordenadores personalizados.': 'Gaming PCs, office computers, workstations and custom computers.', 'VER PRODUCTOS': 'VIEW PRODUCTS', 'Componentes': 'Components', 'Procesadores, tarjetas gráficas, RAM, SSD, placas base, fuentes y mucho más.': 'Processors, graphics cards, RAM, SSDs, motherboards, power supplies and more.', 'Periféricos': 'Peripherals', 'Monitores, teclados, ratones, auriculares, webcams y accesorios.': 'Monitors, keyboards, mice, headsets, webcams and accessories.', 'Nosotros nos encargamos.': 'We take care of it.', 'Además de vender tecnología, ofrecemos servicios informáticos para mantener tus equipos funcionando.': 'As well as selling technology, we provide IT services to keep your equipment running.', '% CLIENTES SATISFECHOS': '% SATISFIED CUSTOMERS', 'H SOPORTE': 'H SUPPORT', '% PERSONALIZADO': '% CUSTOMIZED', 'Soluciones informáticas.': 'IT solutions.', 'Reparación': 'Repairs', 'Diagnóstico y reparación de ordenadores, portátiles y componentes.': 'Diagnosis and repair of computers, laptops and components.', 'Montaje de equipos': 'PC assembly', 'Montamos equipos personalizados según las necesidades y presupuesto del cliente.': 'We build custom systems to suit each customer’s needs and budget.', 'Mantenimiento': 'Maintenance', 'Limpieza, optimización y mantenimiento preventivo de equipos.': 'Cleaning, optimization and preventive equipment maintenance.', 'Soporte técnico': 'Technical support', 'Ayuda técnica para resolver problemas de hardware, software y configuración.': 'Technical help with hardware, software and configuration issues.', 'Compra tu equipo.': 'Buy your computer.', 'Nosotros lo dejamos listo.': 'We will get it ready.', 'Combina nuestros productos con nuestros servicios para recibir un equipo preparado y configurado.': 'Combine our products and services to receive a prepared and configured system.', 'PC + Montaje': 'PC + Assembly', 'Elige tus componentes y nosotros montamos el equipo.': 'Choose your components and we will assemble the PC.', 'PC + Configuración': 'PC + Setup', 'Equipo preparado, configurado y listo para usar.': 'Prepared, configured and ready-to-use equipment.', 'Equipo + Mantenimiento': 'PC + Maintenance', 'Compra tu equipo y añade mantenimiento preventivo.': 'Buy your computer and add preventive maintenance.', 'Comprar ahora': 'Buy now', 'Pago seguro': 'Secure payment', 'Tu información, protegida.': 'Your information, protected.', 'La seguridad forma parte de nuestra infraestructura desde el primer momento.': 'Security is part of our infrastructure from day one.', 'Acceso seguro': 'Secure access', 'Control de usuarios y acceso mediante cuentas.': 'User control and account-based access.', 'Copias de seguridad': 'Backups', 'Protección de la información mediante backups.': 'Information protection through backups.', 'Protección web': 'Web protection', 'Firewall y medidas de protección frente a ataques.': 'Firewall and measures to protect against attacks.', 'Conocemos cómo utilizas': 'We understand how you use', 'nuestra web.': 'our website.', 'El sistema registra las interacciones para conocer qué partes de la página reciben más interés.': 'The system records interactions to understand which parts of the site attract the most interest.', 'Registrar interacción': 'Record interaction', 'INTERACCIONES': 'INTERACTIONS', 'CLICKS REGISTRADOS': 'CLICKS RECORDED', '¿Hablamos?': 'Shall we talk?', 'Cuéntanos qué necesitas y nos pondremos en contacto contigo.': 'Tell us what you need and we will contact you.', 'Enviar mensaje →': 'Send message →', 'Tecnología, productos y servicios informáticos.': 'Technology, products and IT services.', 'Iniciar sesión': 'Log in', 'Entrar': 'Sign in', 'Finalizar compra': 'Complete purchase', 'Datos de entrega': 'Delivery details', '¿Dónde quieres recibir tu pedido?': 'Where would you like your order delivered?', 'Nombre y apellidos': 'Full name', 'Teléfono': 'Phone', 'Dirección de entrega': 'Delivery address', 'Código postal': 'Postal code', 'Ciudad': 'City', 'Provincia': 'Region', 'Datos de pago': 'Payment details', 'Pago seguro y cifrado': 'Secure, encrypted payment', 'Nombre del titular': 'Cardholder name', 'Número de tarjeta': 'Card number', 'Caducidad': 'Expiry date', 'Confirmar pedido': 'Confirm order', 'Pago simulado para proyecto académico. No se realizará ningún cargo real ni se almacenarán los datos introducidos.': 'Simulated payment for an academic project. No real charge will be made and entered data will not be stored.', 'Saltar al contenido principal': 'Skip to main content', 'Idioma': 'Language', 'Alto contraste': 'High contrast', 'Reducir movimiento': 'Reduce motion', 'Conoce CASTRORDENADORES.': 'Discover CASTRORDENADORES.', 'Reproduce nuestro vídeo con subtítulos y controles compatibles con teclado.': 'Play our video with captions and keyboard-accessible controls.', 'El vídeo estará disponible cuando se configure su enlace de YouTube o archivo MP4.': 'The video will be available once its YouTube link or MP4 file is configured.', 'Si el vídeo dispone de subtítulos en varios idiomas, podrás seleccionarlos desde el reproductor.': 'If the video has captions in multiple languages, you can select them in the player.', 'HTTPS': 'HTTPS', 'Comunicación cifrada mediante certificado SSL/TLS.': 'Encrypted communication using an SSL/TLS certificate.', '04 / SEGURIDAD': '04 / SECURITY', '05 / ANALYTICS': '05 / ANALYTICS', '06 / CONTACTO': '06 / CONTACT', '03 / PRODUCTOS + SERVICIOS': '03 / PRODUCTS + SERVICES', '01 / PRODUCTOS': '01 / PRODUCTS', '02 / SERVICIOS': '02 / SERVICES', '02.1 / SERVICIOS DISPONIBLES': '02.1 / AVAILABLE SERVICES', 'Packs personalizados': 'Custom bundles', 'Pack personalizado': 'Custom bundle', 'DESDE': 'FROM', 'CUENTA': 'ACCOUNT', 'CARD': 'CARD', 'TITULAR DE LA TARJETA': 'CARDHOLDER'}, 'zh': {'Preparando tu experiencia...': '正在准备您的体验…', 'Inicio': '首页', 'Productos': '产品', 'Servicios': '服务', 'Productos + Servicios': '产品与服务', 'Contacto': '联系', 'Mi cuenta': '我的账户', 'SISTEMAS ONLINE': '系统在线', 'TECNOLOGÍA • PRODUCTOS • SERVICIOS': '技术 • 产品 • 服务', 'Tecnología para': '满足您需求的', 'lo que necesites.': '科技解决方案。', 'Ordenadores, componentes, periféricos y servicios informáticos para particulares y empresas.': '为个人和企业提供电脑、组件、外设及信息技术服务。', 'Ver productos': '查看产品', 'Ver servicios': '查看服务', 'PRODUCTOS': '产品', 'SERVICIOS': '服务', 'SOPORTE': '支持', 'SOLUCIONES': '解决方案', 'UPTIME': '正常运行时间', 'Todo lo que necesitas.': '您需要的一切。', 'Componentes y equipos informáticos preparados para cualquier tipo de usuario.': '为各种用户准备的电脑组件和设备。', 'Ordenadores': '电脑', 'PCs gaming, equipos de oficina, estaciones de trabajo y ordenadores personalizados.': '游戏电脑、办公设备、工作站和定制电脑。', 'VER PRODUCTOS': '查看产品', 'Componentes': '组件', 'Procesadores, tarjetas gráficas, RAM, SSD, placas base, fuentes y mucho más.': '处理器、显卡、内存、固态硬盘、主板、电源等。', 'Periféricos': '外设', 'Monitores, teclados, ratones, auriculares, webcams y accesorios.': '显示器、键盘、鼠标、耳机、摄像头及配件。', 'Nosotros nos encargamos.': '交给我们处理。', 'Además de vender tecnología, ofrecemos servicios informáticos para mantener tus equipos funcionando.': '除了销售科技产品，我们还提供电脑维护服务。', 'Soluciones informáticas.': '信息技术解决方案。', 'Reparación': '维修', 'Diagnóstico y reparación de ordenadores, portátiles y componentes.': '电脑、笔记本和组件的检测与维修。', 'Montaje de equipos': '设备组装', 'Montamos equipos personalizados según las necesidades y presupuesto del cliente.': '根据客户需求和预算组装定制电脑。', 'Mantenimiento': '维护', 'Limpieza, optimización y mantenimiento preventivo de equipos.': '设备清洁、优化和预防性维护。', 'Soporte técnico': '技术支持', 'Ayuda técnica para resolver problemas de hardware, software y configuración.': '协助解决硬件、软件和配置问题。', 'Compra tu equipo.': '购买您的设备。', 'Nosotros lo dejamos listo.': '我们为您准备就绪。', 'Combina nuestros productos con nuestros servicios para recibir un equipo preparado y configurado.': '结合我们的产品与服务，获得已准备和配置好的设备。', 'PC + Montaje': '电脑 + 组装', 'Elige tus componentes y nosotros montamos el equipo.': '选择组件，我们负责组装。', 'PC + Configuración': '电脑 + 配置', 'Equipo preparado, configurado y listo para usar.': '设备已准备、配置并可立即使用。', 'Equipo + Mantenimiento': '设备 + 维护', 'Compra tu equipo y añade mantenimiento preventivo.': '购买设备并添加预防性维护。', 'Comprar ahora': '立即购买', 'Pago seguro': '安全支付', 'Tu información, protegida.': '保护您的信息。', 'La seguridad forma parte de nuestra infraestructura desde el primer momento.': '安全从一开始就是我们基础设施的一部分。', 'Acceso seguro': '安全访问', 'Control de usuarios y acceso mediante cuentas.': '通过账户进行用户和访问管理。', 'Copias de seguridad': '备份', 'Protección de la información mediante backups.': '通过备份保护信息。', 'Protección web': '网站防护', 'Firewall y medidas de protección frente a ataques.': '防火墙和防攻击措施。', 'Conocemos cómo utilizas': '了解您如何使用', 'nuestra web.': '我们的网站。', 'El sistema registra las interacciones para conocer qué partes de la página reciben más interés.': '系统记录互动，以了解网页中最受关注的部分。', 'Registrar interacción': '记录互动', 'INTERACCIONES': '互动次数', 'CLICKS REGISTRADOS': '已记录点击', '¿Hablamos?': '联系我们？', 'Cuéntanos qué necesitas y nos pondremos en contacto contigo.': '告诉我们您的需求，我们会与您联系。', 'Enviar mensaje →': '发送消息 →', 'Tecnología, productos y servicios informáticos.': '科技产品与信息技术服务。', 'Iniciar sesión': '登录', 'Entrar': '进入', 'Finalizar compra': '完成购买', 'Datos de entrega': '配送信息', '¿Dónde quieres recibir tu pedido?': '您希望将订单送到哪里？', 'Nombre y apellidos': '姓名', 'Teléfono': '电话', 'Dirección de entrega': '配送地址', 'Código postal': '邮政编码', 'Ciudad': '城市', 'Provincia': '省/地区', 'Datos de pago': '付款信息', 'Pago seguro y cifrado': '安全加密支付', 'Nombre del titular': '持卡人姓名', 'Número de tarjeta': '银行卡号', 'Caducidad': '有效期', 'Confirmar pedido': '确认订单', 'Pago simulado para proyecto académico. No se realizará ningún cargo real ni se almacenarán los datos introducidos.': '学术项目模拟付款。不会产生真实扣款，也不会存储输入的数据。', 'Saltar al contenido principal': '跳转到主要内容', 'Idioma': '语言', 'Alto contraste': '高对比度', 'Reducir movimiento': '减少动态效果', 'Conoce CASTRORDENADORES.': '了解 CASTRORDENADORES。', 'Reproduce nuestro vídeo con subtítulos y controles compatibles con teclado.': '播放带字幕且支持键盘操作的视频。', 'El vídeo estará disponible cuando se configure su enlace de YouTube o archivo MP4.': '配置 YouTube 链接或 MP4 文件后，视频即可播放。', 'Si el vídeo dispone de subtítulos en varios idiomas, podrás seleccionarlos desde el reproductor.': '如果视频提供多语言字幕，您可以在播放器中选择。', 'HTTPS': 'HTTPS', 'Comunicación cifrada mediante certificado SSL/TLS.': '使用 SSL/TLS 证书进行加密通信。', '04 / SEGURIDAD': '04 / 安全', '05 / ANALYTICS': '05 / 数据分析', '06 / CONTACTO': '06 / 联系', '03 / PRODUCTOS + SERVICIOS': '03 / 产品与服务', '01 / PRODUCTOS': '01 / 产品', '02 / SERVICIOS': '02 / 服务', '02.1 / SERVICIOS DISPONIBLES': '02.1 / 可用服务', 'Pack personalizado': '定制套餐', 'DESDE': '起价', 'CUENTA': '账户', 'TITULAR DE LA TARJETA': '持卡人'}, 'de': {'Preparando tu experiencia...': 'Ihr Erlebnis wird vorbereitet…', 'Inicio': 'Startseite', 'Productos': 'Produkte', 'Servicios': 'Dienstleistungen', 'Productos + Servicios': 'Produkte + Dienstleistungen', 'Contacto': 'Kontakt', 'Mi cuenta': 'Mein Konto', 'SISTEMAS ONLINE': 'SYSTEME ONLINE', 'TECNOLOGÍA • PRODUCTOS • SERVICIOS': 'TECHNIK • PRODUKTE • DIENSTLEISTUNGEN', 'Tecnología para': 'Technik für', 'lo que necesites.': 'alles, was Sie brauchen.', 'Ordenadores, componentes, periféricos y servicios informáticos para particulares y empresas.': 'Computer, Komponenten, Peripheriegeräte und IT-Dienstleistungen für Privatpersonen und Unternehmen.', 'Ver productos': 'Produkte ansehen', 'Ver servicios': 'Dienstleistungen ansehen', 'PRODUCTOS': 'PRODUKTE', 'SERVICIOS': 'DIENSTLEISTUNGEN', 'SOPORTE': 'SUPPORT', 'SOLUCIONES': 'LÖSUNGEN', 'UPTIME': 'VERFÜGBARKEIT', 'Todo lo que necesitas.': 'Alles, was Sie brauchen.', 'Componentes y equipos informáticos preparados para cualquier tipo de usuario.': 'Computerkomponenten und Geräte für jeden Anwendertyp.', 'Ordenadores': 'Computer', 'PCs gaming, equipos de oficina, estaciones de trabajo y ordenadores personalizados.': 'Gaming-PCs, Bürocomputer, Workstations und individuell konfigurierte Computer.', 'VER PRODUCTOS': 'PRODUKTE ANSEHEN', 'Componentes': 'Komponenten', 'Procesadores, tarjetas gráficas, RAM, SSD, placas base, fuentes y mucho más.': 'Prozessoren, Grafikkarten, RAM, SSDs, Mainboards, Netzteile und vieles mehr.', 'Periféricos': 'Peripheriegeräte', 'Monitores, teclados, ratones, auriculares, webcams y accesorios.': 'Monitore, Tastaturen, Mäuse, Headsets, Webcams und Zubehör.', 'Nosotros nos encargamos.': 'Wir kümmern uns darum.', 'Además de vender tecnología, ofrecemos servicios informáticos para mantener tus equipos funcionando.': 'Neben dem Verkauf von Technik bieten wir IT-Dienstleistungen, damit Ihre Geräte zuverlässig funktionieren.', 'Soluciones informáticas.': 'IT-Lösungen.', 'Reparación': 'Reparatur', 'Diagnóstico y reparación de ordenadores, portátiles y componentes.': 'Diagnose und Reparatur von Computern, Laptops und Komponenten.', 'Montaje de equipos': 'PC-Montage', 'Montamos equipos personalizados según las necesidades y presupuesto del cliente.': 'Wir bauen individuelle Systeme nach Bedarf und Budget.', 'Mantenimiento': 'Wartung', 'Limpieza, optimización y mantenimiento preventivo de equipos.': 'Reinigung, Optimierung und vorbeugende Gerätewartung.', 'Soporte técnico': 'Technischer Support', 'Ayuda técnica para resolver problemas de hardware, software y configuración.': 'Technische Hilfe bei Hardware-, Software- und Konfigurationsproblemen.', 'Compra tu equipo.': 'Kaufen Sie Ihr Gerät.', 'Nosotros lo dejamos listo.': 'Wir machen es einsatzbereit.', 'Combina nuestros productos con nuestros servicios para recibir un equipo preparado y configurado.': 'Kombinieren Sie unsere Produkte und Dienstleistungen und erhalten Sie ein vorbereitetes, konfiguriertes Gerät.', 'PC + Montaje': 'PC + Montage', 'Elige tus componentes y nosotros montamos el equipo.': 'Wählen Sie Ihre Komponenten, wir bauen den PC zusammen.', 'PC + Configuración': 'PC + Einrichtung', 'Equipo preparado, configurado y listo para usar.': 'Vorbereitet, konfiguriert und sofort einsatzbereit.', 'Equipo + Mantenimiento': 'PC + Wartung', 'Compra tu equipo y añade mantenimiento preventivo.': 'Kaufen Sie Ihr Gerät und ergänzen Sie eine vorbeugende Wartung.', 'Comprar ahora': 'Jetzt kaufen', 'Pago seguro': 'Sichere Zahlung', 'Tu información, protegida.': 'Ihre Informationen sind geschützt.', 'La seguridad forma parte de nuestra infraestructura desde el primer momento.': 'Sicherheit ist von Anfang an Teil unserer Infrastruktur.', 'Acceso seguro': 'Sicherer Zugriff', 'Control de usuarios y acceso mediante cuentas.': 'Benutzerverwaltung und kontobasierter Zugriff.', 'Copias de seguridad': 'Sicherungen', 'Protección de la información mediante backups.': 'Schutz von Informationen durch Backups.', 'Protección web': 'Webschutz', 'Firewall y medidas de protección frente a ataques.': 'Firewall und Schutzmaßnahmen gegen Angriffe.', 'Conocemos cómo utilizas': 'Wir verstehen, wie Sie', 'nuestra web.': 'unsere Website nutzen.', 'El sistema registra las interacciones para conocer qué partes de la página reciben más interés.': 'Das System erfasst Interaktionen, um die beliebtesten Seitenbereiche zu erkennen.', 'Registrar interacción': 'Interaktion erfassen', 'INTERACCIONES': 'INTERAKTIONEN', 'CLICKS REGISTRADOS': 'ERFASSTE KLICKS', '¿Hablamos?': 'Sprechen wir?', 'Cuéntanos qué necesitas y nos pondremos en contacto contigo.': 'Teilen Sie uns mit, was Sie benötigen. Wir melden uns bei Ihnen.', 'Enviar mensaje →': 'Nachricht senden →', 'Tecnología, productos y servicios informáticos.': 'Technik, Produkte und IT-Dienstleistungen.', 'Iniciar sesión': 'Anmelden', 'Entrar': 'Einloggen', 'Finalizar compra': 'Kauf abschließen', 'Datos de entrega': 'Lieferdaten', '¿Dónde quieres recibir tu pedido?': 'Wohin soll Ihre Bestellung geliefert werden?', 'Nombre y apellidos': 'Vor- und Nachname', 'Teléfono': 'Telefon', 'Dirección de entrega': 'Lieferadresse', 'Código postal': 'Postleitzahl', 'Ciudad': 'Stadt', 'Provincia': 'Region', 'Datos de pago': 'Zahlungsdaten', 'Pago seguro y cifrado': 'Sichere, verschlüsselte Zahlung', 'Nombre del titular': 'Name des Karteninhabers', 'Número de tarjeta': 'Kartennummer', 'Caducidad': 'Ablaufdatum', 'Confirmar pedido': 'Bestellung bestätigen', 'Pago simulado para proyecto académico. No se realizará ningún cargo real ni se almacenarán los datos introducidos.': 'Simulierte Zahlung für ein akademisches Projekt. Es wird keine echte Abbuchung vorgenommen und die eingegebenen Daten werden nicht gespeichert.', 'Saltar al contenido principal': 'Zum Hauptinhalt springen', 'Idioma': 'Sprache', 'Alto contraste': 'Hoher Kontrast', 'Reducir movimiento': 'Bewegung reduzieren', 'Conoce CASTRORDENADORES.': 'Lernen Sie CASTRORDENADORES kennen.', 'Reproduce nuestro vídeo con subtítulos y controles compatibles con teclado.': 'Sehen Sie unser Video mit Untertiteln und tastaturbedienbaren Steuerelementen.', 'El vídeo estará disponible cuando se configure su enlace de YouTube o archivo MP4.': 'Das Video ist verfügbar, sobald ein YouTube-Link oder eine MP4-Datei eingerichtet wurde.', 'Si el vídeo dispone de subtítulos en varios idiomas, podrás seleccionarlos desde el reproductor.': 'Wenn das Video Untertitel in mehreren Sprachen bietet, können Sie diese im Player auswählen.', 'HTTPS': 'HTTPS', 'Comunicación cifrada mediante certificado SSL/TLS.': 'Verschlüsselte Kommunikation mit SSL/TLS-Zertifikat.', '04 / SEGURIDAD': '04 / SICHERHEIT', '05 / ANALYTICS': '05 / ANALYTICS', '06 / CONTACTO': '06 / KONTAKT', '03 / PRODUCTOS + SERVICIOS': '03 / PRODUKTE + DIENSTLEISTUNGEN', '01 / PRODUCTOS': '01 / PRODUKTE', '02 / SERVICIOS': '02 / DIENSTLEISTUNGEN', '02.1 / SERVICIOS DISPONIBLES': '02.1 / VERFÜGBARE DIENSTLEISTUNGEN', 'Pack personalizado': 'Individuelles Paket', 'DESDE': 'AB', 'CUENTA': 'KONTO', 'TITULAR DE LA TARJETA': 'KARTENINHABER'}};
  const originalNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const value = node.nodeValue.trim();
    if (value && Object.values(translations).some(dict => Object.prototype.hasOwnProperty.call(dict, value))) {
      originalNodes.push({node, value, prefix: node.nodeValue.match(/^\s*/)?.[0] || '', suffix: node.nodeValue.match(/\s*$/)?.[0] || ''});
    }
  }
  const languageSelect = document.getElementById('languageSelect');
  const setLanguage = lang => {
    const dict = translations[lang] || {};
    originalNodes.forEach(item => { item.node.nodeValue = item.prefix + (lang === 'es' ? item.value : (dict[item.value] || item.value)) + item.suffix; });
    document.documentElement.lang = ({es:'es',en:'en',zh:'zh-CN',de:'de'})[lang] || 'es';
    try { localStorage.setItem('castrordenadores-language', lang); } catch (_) {}
    document.title = ({es:'CASTRORDENADORES. | Tecnología y servicios',en:'CASTRORDENADORES. | Technology and services',zh:'CASTRORDENADORES. | 技术与服务',de:'CASTRORDENADORES. | Technik und Dienstleistungen'})[lang];
  };
  if (languageSelect) {
    let saved = 'es'; try { saved = localStorage.getItem('castrordenadores-language') || 'es'; } catch (_) {}
    languageSelect.value = saved; setLanguage(saved);
    languageSelect.addEventListener('change', () => setLanguage(languageSelect.value));
  }
  let scale = 1;
  const applyScale = () => document.documentElement.style.setProperty('--a11y-font-scale', String(scale));
  document.getElementById('fontUp')?.addEventListener('click', () => { scale = Math.min(1.5, +(scale + .1).toFixed(2)); applyScale(); });
  document.getElementById('fontDown')?.addEventListener('click', () => { scale = Math.max(.85, +(scale - .1).toFixed(2)); applyScale(); });
  document.getElementById('contrastToggle')?.addEventListener('click', e => { const active = document.body.classList.toggle('a11y-high-contrast'); e.currentTarget.setAttribute('aria-pressed', String(active)); });
  document.getElementById('motionToggle')?.addEventListener('click', e => { const active = document.body.classList.toggle('a11y-reduce-motion'); e.currentTarget.setAttribute('aria-pressed', String(active)); });
  // Avoid mouse-only visual effects for touch users and people who prefer reduced motion.
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(pointer: coarse)').matches) {
    document.body.classList.add('a11y-reduce-motion');
    document.querySelectorAll('.cursor,.cursor-blur').forEach(el => el.hidden = true);
  }
  // Video configuration: choose ONE source. MP4 should be H.264 video + AAC audio for broad support.
  const VIDEO_CONFIG = { youtubeId: '0zkX6nlpiSk', mp4: 'assets/video.mp4', captions: { es:'assets/subtitles-es.vtt', en:'assets/subtitles-en.vtt', zh:'assets/subtitles-zh.vtt', de:'assets/subtitles-de.vtt' } };
  const player = document.getElementById('videoPlayer');
  if (player) {
    if (VIDEO_CONFIG.youtubeId) {
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(VIDEO_CONFIG.youtubeId)}`;
      frame.title = 'Vídeo de CASTRORDENADORES'; frame.loading = 'lazy';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; frame.allowFullscreen = true;
      player.replaceChildren(frame);
    } else if (VIDEO_CONFIG.mp4 && VIDEO_CONFIG.mp4 !== 'assets/video.mp4' || document.querySelector('source[data-video-ready]')) {
      const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.playsInline = true;
      video.setAttribute('aria-label', 'Vídeo de CASTRORDENADORES');
      const source = document.createElement('source'); source.src = VIDEO_CONFIG.mp4; source.type = 'video/mp4'; video.append(source);
      Object.entries(VIDEO_CONFIG.captions).forEach(([lang, url]) => { const track = document.createElement('track'); track.kind = 'captions'; track.srclang = lang; track.label = ({es:'Español',en:'English',zh:'中文',de:'Deutsch'})[lang]; track.src = url; if (lang === 'es') track.default = true; video.append(track); });
      video.addEventListener('error', () => { player.innerHTML = '<p>No se ha podido cargar el vídeo. Comprueba que el archivo MP4 y los subtítulos estén en la carpeta assets.</p>'; });
      player.replaceChildren(video);
    }
  }
  // Make modal state understandable to assistive technology without changing its visual behaviour.
  ['loginModal','paymentModal'].forEach(id => {
    const modal = document.getElementById(id); if (!modal) return;
    const observer = new MutationObserver(() => modal.setAttribute('aria-hidden', String(getComputedStyle(modal).display === 'none')));
    observer.observe(modal, {attributes:true, attributeFilter:['style','class']});
    modal.setAttribute('aria-hidden', String(getComputedStyle(modal).display === 'none'));
  });
})();
