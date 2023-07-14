// Nama cache
const CACHE_NAME = 'pet-care-cache-v1';

// Daftar file yang akan di-cache
const urlsToCache = [
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/index.html',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/assets/css/style.css',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/assets/js/script.js',
];

// Install Service Worker dan caching file
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Menghapus cache yang tidak diperlukan saat Service Worker diaktivasi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          }).map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
  );
});

// Mengintersep permintaan fetch dan mencoba mencari data dari cache terlebih dahulu
// Jika tidak ditemukan di cache, permintaan akan dilakukan ke server dan data akan dicache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
