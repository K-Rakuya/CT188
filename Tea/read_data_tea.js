import { control_button_order, create_control_Slider } from "../Nav_and_button/control.js";
fetch("Tea/data_tea.json")
  .then(res => res.json())
  .then(data => renderProducts(data))
  .then(slider=> create_control_Slider(slider))
  .then(slider=> control_button_order(slider))
  .catch(err => console.error(err));

function renderProducts(products) {
  const slider_track = document.getElementById("product-list-tea");
  let html = ``;

  products.forEach(p => {
    html += `
      <article class="product-card product-card-tea">
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



