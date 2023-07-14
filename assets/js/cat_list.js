function showCats(cats) {
  const adoptSection = document.getElementById('adopt');
  let html = '';
  cats.forEach((cat) => {
    html += `
      <div class="cat-card">
        <img src="${cat.image_url}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
      </div>
    `;
  });
  adoptSection.innerHTML = html;
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
