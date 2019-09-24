var cacheName = 'myfirstpwa';
var filesToCache = [
  './',
  './index.html',
  './styles.css'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] caching app');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  console.log('[ServiceWorker] activate');
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
