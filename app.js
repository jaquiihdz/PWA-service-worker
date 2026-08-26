const elementoHora = document.getElementById("hora");
const elementoFecha = document.getElementById("fecha");

/**
 * Actualiza la hora y fecha del sistema.
 */
function actualizarHora() {

    const ahora = new Date();

    // Formato de hora HH:MM:SS
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    const segundos = String(ahora.getSeconds()).padStart(2, "0");

    elementoHora.textContent =
        `${horas}:${minutos}:${segundos}`;

    // Formato de fecha en español
    const opcionesFecha = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    elementoFecha.textContent =
        ahora.toLocaleDateString("es-MX", opcionesFecha);
}

// Ejecutar inmediatamente
actualizarHora();

// Actualizar cada segundo
setInterval(actualizarHora, 1000);


/**
 * Registro del Service Worker.
 */
if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("service-worker.js")
            .then(() => {

                console.log(
                    "Service Worker registrado correctamente."
                );

            })
            .catch((error) => {

                console.error(
                    "Error al registrar el Service Worker:",
                    error
                );

            });

    });
}
