const CACHE_NAME = 'portfolio-pwa-v2';
const CACHE_URLS = ['/', '/manifest.json', '/bernardpng.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) =>
          cacheName !== CACHE_NAME ? caches.delete(cacheName) : Promise.resolve()
        )
      )
    )
  );
  self.clients.claim();
});

// Network-first: always try the live network so fresh HTML/CSS/JS is served,
// and fall back to the cache only when offline. (The old cache-first strategy
// kept serving stale styles after every deploy.)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
