fetch("/Phuc/Cafe/products_coffe.json")
  .then(res => res.json())
  .then(renderProducts)
  .catch(err => console.error(err));

function renderProducts(products) {
  const container = document.getElementById("product-list-cafe");
  let html = "";

  products.forEach(p => {
    html += `
      <article class="product-card product-card-cafe">
        <div class="container_images">
          <img class="images_product" src="${p.image}" alt="${p.name}">
        </div>

        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
        </div>

        <div class="container_btn">
          <button class="order-btn" data-id="${p.id}">
            Đặt Hàng
          </button>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}


