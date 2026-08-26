const CACHE_NAME = "pwa-hora-v1";

const ARCHIVOS = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./icon.png"
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARCHIVOS);
            })

    );

    self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then((nombresCache) => {

            return Promise.all(

                nombresCache
                    .filter((nombre) => nombre !== CACHE_NAME)
                    .map((nombre) => caches.delete(nombre))

            );

        })

    );

    self.clients.claim();
});

// Intercepta las solicitudes y utiliza la caché cuando sea necesario
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((respuestaCache) => {

                return respuestaCache || fetch(event.request);

            })

    );
});
