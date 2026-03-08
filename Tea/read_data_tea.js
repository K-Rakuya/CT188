fetch("Tea/data_tea.json")
  .then(res => res.json())
  .then(data => renderProductsTea(data))
  .catch(err => console.error(err));

function renderProductsTea(products) {
  const product_grid = document.querySelector(".tea-list");
  let html = ``;

  products.forEach(p => {
    html += `
      <article class="product-card tea-card">
          <img src="${p.image}" alt="${p.name}">
          <div class="info-product">
              <h4>${p.name}</h4>
              <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
          </div>
          <button>Thêm vào giỏ</button>
      </article>
    `;
  });

  product_grid.innerHTML = html;
}



