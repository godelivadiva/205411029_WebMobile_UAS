// fungsi showCats menerima parameter cats dari hasil fetch data API
function showCats(cats) {
  // mengambil id catList dari DOM
  const catListElement = document.getElementById('catList');
  
  // iterasi setiap objek cat dari array cats
  cats.forEach((cat) => {
    // menambahkan konten setiap cat dalam bentuk card
    const catCard = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${cat.image_url}" class="card-img-top" alt="${cat.name}">
          <div class="card-body">
            <h5 class="card-title">${cat.name}</h5>
            <p class="card-text">${cat.description}</p>
            <p class="card-text">Gender: ${cat.gender}</p>
            <p class="card-text">Age: ${cat.age} years old</p>
          </div>
        </div>
      </div>
    `;
    // menambahkan card cat ke dalam catList
    catListElement.innerHTML += catCard;
  });
}

// Mengambil data dari REST API yang dikonfersi ke json
fetch('https://63afb929649c73f572c113ad.mockapi.io/api/v1/cat_adoption_list')
  .then((response) => response.json())
  .then((data) => {
    // memanggil fungsi showCats dengan parameter array dari hasil json
    showCats(data);
  })
  .catch((error) => { // jika error
    console.error('Gagal memuat data:', error);
  });
