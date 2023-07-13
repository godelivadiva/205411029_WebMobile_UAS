let db;

// Membuka koneksi IndexedDB
const request = indexedDB.open('catDB', 1);

// Membuat schema IndexedDB
request.onupgradeneeded = (event) => {
  db = event.target.result;

  // Membuat objek store
  const store = db.createObjectStore('cats', { keyPath: 'id' });
  store.createIndex('nameIndex', 'name');
};

request.onerror = (event) => {
  console.error('Koneksi ke IndexedDB gagal:', event.target.errorCode);
};

request.onsuccess = (event) => {
  db = event.target.result;

  // Menyimpan data dari API ke IndexedDB
  fetch('https://63afb929649c73f572c113ad.mockapi.io/api/v1/cat_adoption_list')
    .then((response) => response.json())
    .then((data) => {
      const transaction = db.transaction('cats', 'readwrite');
      const store = transaction.objectStore('cats');

      data.forEach((cat) => {
        store.put(cat);
      });
    })
    .catch((error) => {
      console.error('Gagal memuat data:', error);
    });

  // Mengambil data dari IndexedDB
  getCatsFromIndexedDB()
    .then((cats) => {
      // Gunakan data kucing dari IndexedDB
      console.log(cats);
    })
    .catch((error) => {
      console.error('Gagal mendapatkan data kucing dari IndexedDB:', error);
    });
};

// Mengambil data dari IndexedDB
function getCatsFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('cats', 'readonly');
    const store = transaction.objectStore('cats');
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}