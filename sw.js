const scope = self.registration.scope;
const cachePrefix = `k-trip:${scope}:`;
const cacheName = `${cachePrefix}12`;
const index = new URL('./index.html', scope).href;
const files = [
  './index.html', './styles.css?v=trip-guide-3', './app.js?v=trip-guide-3', './data.js?v=trip-guide-3',
  './manifest.webmanifest', './assets/korea-autumn.webp',
  './assets/icon-180.png', './assets/icon-192.png', './assets/icon-512.png'
];
const paths = new Set(files.map(file => new URL(file, scope).pathname));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files.map(file => new Request(new URL(file, scope), {cache:'reload'})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(cachePrefix) && name !== cacheName)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function load(request, fallbackKey) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      try { await cache.put(fallbackKey, response.clone()); } catch {}
    }
    if (response.status < 500) return response;
  } catch {}
  return (await cache.match(fallbackKey)) ?? Response.error();
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || !request.url.startsWith(scope)) return;
  const isHome = url.pathname === new URL(scope).pathname || url.pathname === new URL(index).pathname;
  if (request.mode === 'navigate' && isHome) {
    event.respondWith(load(request, index));
  } else if (paths.has(url.pathname)) {
    event.respondWith(load(request, request));
  }
});
