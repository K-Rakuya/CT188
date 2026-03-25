import { isLoggedIn } from "../CheckUser/isLogged.js";
let currentCard = null;

export function add_Event_order_btn(product_grid) {
  const List_of_cards = product_grid.querySelectorAll(".product-card");
  const order_table = document.querySelector("#order-form");

  List_of_cards.forEach(card => {
    const btn_order = card.querySelector(".btn-order");

    btn_order.addEventListener("click", () => {
      if (!isLoggedIn()) {
        window.location.href = "/pages/login/login.html";
      } 
      else {
        order_table.classList.add("toggle");
        currentCard = card;
        console.log(currentCard)

        let img = card.querySelector("img").src;   
        let container_img = order_table.querySelector(".img-order-form");
        container_img.innerHTML = `<img src=${img}>`;
      }
    });
  });

  order_table.onsubmit = (e) => {
    //Ngăn reload trang
    e.preventDefault();

    //lấy dữ liệu từ form, trả về 1 object
    const data = new FormData(order_table);
    const quantity = data.get("quantity");
    console.log(quantity)

    addProduct(currentCard, quantity);

    alert("ĐÃ THÊM SẢN PHẨM VÀO GIỎ HÀNG");

    order_table.classList.remove("toggle");
  };
}


function addProduct(card, number){
  const quantity = Number(number);
  let list_products = JSON.parse(localStorage.getItem('products')) || [];
  const id = card.id;
  console.log(id);

  let index_pd = existence(id, list_products);
  if(index_pd != -1){
    list_products[index_pd].quantity += quantity;
    localStorage.setItem("products", JSON.stringify(list_products));
    return;
  }

  let name = card.querySelector(".pd-name").textContent;
  let price = card.querySelector(".price").textContent;
  price = Number(price.replace(/\D/g, ""));
  let image = card.querySelector("img").src;       

  const product = {
    id: id,
    name: name,
    price: price,
    image: image,
    quantity: quantity
  }
  
  list_products.push(product);
  localStorage.setItem("products", JSON.stringify(list_products));
}

function existence(id_product, list_product){
  for(let i = 0; i < list_product.length; i++){
    if(list_product[i].id === id_product){
      return i;
    }
  }
  return -1;
}