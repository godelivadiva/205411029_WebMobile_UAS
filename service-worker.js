// nama cache
const CACHE_NAME = 'pet-care-cache-v1';

// file yang akan di-cache beserta dengan URLnya karena tanpa URL, akan muncul error 
// Failed to execute 'addAll' on 'Cache'
const urlsToCache = [
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/index.html',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/assets/css/style.css',
  'https://godelivadiva.github.io/205411029_WebMobile_UAS/assets/js/script.js',
];

// Install Service Worker dan caching file
// caching file: proses menyimpan file sementara
// service worker harus menunggu hingga 
// dimana perintah open akan membuka atau membuat cache
// method addAll untuk menambahkan file yang akan di-cache ke dalam cache yang telah dibuka sebelumnya 
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Menghapus cache yang tidak diperlukan saat Service Worker diaktivasi
// service worker akan menghapus semua cache yang tidak sesuai dengan CACHE_NAME, 
// sehingga hanya cache yang digunakan untuk tetap ada di service worker
// bertujuan untuk membersihkan cache yang sudah tidak digunakan lagi dan 
// memastikan service worker selalu menggunakan cache yang diperbarui dan relevan.
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

// Jika ada response yang sesuai di cache, maka service worker akan mengembalikan response tersebut 
// sebagai respon untuk fetch.
// Jika tidak ada response yang sesuai di cache, maka service worker akan melakukan fetch ke server 
// untuk mendapatkan response baru, lalu menyimpannya ke dalam cache untuk digunakan pada fetch selanjutnya.
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
