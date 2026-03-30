const CACHE_NAME = 'foehren-app-v1.1.0';
const ASSETS = [
  './',
  './foehren-feld-app.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.wasm'
];

// Install: cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy for app assets, network-first for external resources
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // For same-origin requests: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      }).catch(() => caches.match('./foehren-feld-app.html'))
    );
  } else {
    // External resources (e.g. sql.js CDN): network-first with cache fallback
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
  }
});
