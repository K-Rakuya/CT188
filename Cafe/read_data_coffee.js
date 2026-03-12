import {getListOfCards} from "../ShowProduct/showPD.js"
import {isLoggedIn} from "../CheckUser/isLogged.js"
fetch("Cafe/data_coffee.json")
  .then(res => res.json())
  .then(data => renderProductsCoffee(data))
  .then(pd_grid => getListOfCards(pd_grid))
  .catch(err => console.error(err));

function renderProductsCoffee(products) {
  const product_grid = document.querySelector(".coffee-list");
  let html = ``;

  products.forEach(p => {
    html += `
      <article class="product-card coffee-card">
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
  const List_of_cards = product_grid.querySelectorAll(".product-card");
  List_of_cards.forEach(card=>{
    const btn_order = card.querySelector(".btn-order");
    btn_order.addEventListener("click", ()=>{
      if(!isLoggedIn()){
        window.location.href = "Register/register.html";
      }
      else{
        const name = card.querySelector("h4").textContent;
        const price = card.querySelector("p").textContent;
        let image = card.querySelector("img").getAttribute("src");
        image = '..' + image;        

        const product = {
          name: name,
          price: price,
          image: image
        }
        let list_products = JSON.parse(localStorage.getItem('products')) || [];
        list_products.push(product);
        localStorage.setItem("products", JSON.stringify(list_products));
      }
    })
  })
  return product_grid;
}




