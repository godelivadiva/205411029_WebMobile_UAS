function showCats(cats) {
  const adoptSection = document.getElementById('adopt');
  cats.forEach((cat) => {
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
    adoptSection.innerHTML += catCard;
  });
}

// Mengambil data dari REST API
fetch('https://63afb929649c73f572c113ad.mockapi.io/api/v1/cat_adoption_list')
  .then((response) => response.json())
  .then((data) => {
    showCats(data);
  })
  .catch((error) => {
    console.error('Gagal memuat data:', error);
  });
