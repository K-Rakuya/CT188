import {ShowProduct} from "../ShowProduct/showPD.js";
import {add_Event_order_btn} from "../Order/order.js"
fetch("Cafe/data_coffee.json")
  .then(res => res.json())
  .then(data => renderProductsCoffee(data))
  .catch(err => console.error(err));

function renderProductsCoffee(products) {
  const list_all_products = document.querySelector(".all-products");
  let html = ``;

  products.forEach(p => {
    html += `
      <article id=${p.id} class="product-card coffee-card" data-category="cafe">
        <div class="container-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="info-product">
            <h4 class="pd-name">${p.name}</h4>
            <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
        </div>
        <button class="btn-order">Thêm vào giỏ</button>
      </article>
    `;
  });

  list_all_products.insertAdjacentHTML("beforeend", html);
  add_Event_order_btn(list_all_products)
  ShowProduct(list_all_products);
}




