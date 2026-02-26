import {create_control_Slider} from "./add_control_slider.js";
fetch("/Phuc/Cafe/products_coffe.json")
  .then(res => res.json())
  .then(data => renderProducts(data))
  .then(slider=> create_control_Slider(slider))
  .catch(err => console.error(err));

function renderProducts(products) {
  const slider_track = document.getElementById("product-list-cafe");
  let html = ``;

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

  slider_track.innerHTML = html;
  return slider_track;
}



