import {ShowProduct} from "../ShowProduct/showPD.js";
import {add_Event_order_btn} from "../Order/order.js";
fetch("Tea/data_tea.json")
  .then(res => res.json())
  .then(data => renderProductsTea(data))
  .then(grid_pd => ShowProduct(grid_pd))
  .catch(err => console.error(err));

function renderProductsTea(products) {
  const product_grid = document.querySelector(".tea-list");
  let html = ``;

  products.forEach(p => {
    html += `
      <article id="${p.id}" class="product-card tea-card">
          <div class="container-img"><img src="${p.image}" alt="${p.name}"></div>
          <div class="info-product">
              <h4 class="pd-name">${p.name}</h4>
              <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
          </div>
          <button class="btn-order">Thêm vào giỏ</button>
      </article>
    `;
  });
  product_grid.innerHTML = html;
  add_Event_order_btn(product_grid);
  return product_grid;
}



