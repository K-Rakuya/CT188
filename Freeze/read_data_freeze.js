
fetch("Freeze/data_freeze.json")
  .then(res => res.json())
  .then(data => renderProductsCoffee(data))
  .then(pd_grid => showPD(pd_grid))
  .catch(err => console.error(err));

function renderProductsCoffee(products) {
  const product_grid = document.querySelector(".freeze-list");
  let html = ``;

  products.forEach(p => {
    html += `
      <article class="product-card freeze-card">
        <div class="container-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="info-product">
            <h4>${p.name}</h4>
            <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
        </div>
        <button class="btn-order">Thêm vào giỏ</button>
      </article>
    `;
  });

  product_grid.innerHTML = html;
  return product_grid;
}



