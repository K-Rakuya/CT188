fetch("/Phuc/Cafe/products_coffe.json")
  .then(res => res.json())
  .then(data => renderProducts(data))
  .then(slider=> control_Slider(slider))
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


function control_Slider(Slider){
  const slider_window = document.querySelector(".slider-window");
  const product_card = Slider.querySelectorAll(".product-card-cafe");
  const btn_prev = document.querySelector(".btn-prev");
  const btn_next = document.querySelector(".btn-next");
  if(product_card.length == 0) {
    return;
  }
  let width_of_card = product_card[0].offsetWidth;

  function updateWidth(){
    width_of_card = product_card[0].offsetWidth;
  }

  window.addEventListener("resize", updateWidth);

  btn_next.addEventListener("click", () => {
    slider_window.scrollBy({
      left: width_of_card,
      behavior: "smooth"
    });
  });

  btn_prev.addEventListener("click", () => {
    slider_window.scrollBy({
      left: -width_of_card,
      behavior: "smooth"
    });
  });
}
