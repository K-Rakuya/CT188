import { isLoggedIn } from "./isLogged.js";
let currentCard = null;

//HÀM KIỂM TRA SẢN PHẨM ĐÃ CÓ TRONG LOCALSTORAGE HAY CHƯA
function existence(id_product, list_product){
  for(let i = 0; i < list_product.length; i++){
    if(list_product[i].id === id_product){
      return i;
    }
  }
  return -1;
}

//HÀM THÊM SẢN PHẨM
function addProduct(card, number){
  //LẤY SỔ LƯỢNG SẢN PHẨM NGƯỜI DÙNG MUỐN THÊM
  const quantity = Number(number);

  //LẤY 1 DANH SÁCH CẢN SẢN PHẨM
  let list_products = JSON.parse(localStorage.getItem('products')) || [];
  const id = card.id;
  
  let index_pd = existence(id, list_products);
  //LẤY CHỈ SỔ HIỆN TẠI CỦA CARD TRONG MẢNG
  if(index_pd != -1){
    //NẾU SẢN PHẨM ĐÃ CÓ THÌ TĂNG SỐ LƯỢNG
    list_products[index_pd].quantity += quantity;
    localStorage.setItem("products", JSON.stringify(list_products));
    return;
  }


  //NẾU CHƯA CÓ THÌ THÊM VÔ STORAGE
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
  //LƯU SẢN PHẨM VÔ STORAGE
  localStorage.setItem("products", JSON.stringify(list_products));
}

export function add_Event_order_btn(product_grid) {
  const List_of_cards = product_grid.querySelectorAll(".product-card");
  const order_table = document.querySelector("#order-form");

  //CHO VÒNG LẶP CHẠY QUA MỖI CARD
  List_of_cards.forEach(card => {
    const btn_order = card.querySelector(".btn-order");

    //THÊM SỰ KIỆN CHO NÚT ORDER
    btn_order.addEventListener("click", () => {
      if (!isLoggedIn()) {
        //NẾU CHƯA ĐĂNG NHẬP THÌ CHUYỂN ĐẾN TRANG ĐĂNG NHẬP
        window.location.href = "/pages/login/login.html";
      } 


      else {
        currentCard = card;
        order_table.classList.add("toggle");

        //LẤY HÌNH ẢNH CỦA CARD ĐỂ HIỂN THỊ TRONG FORM
        let img = card.querySelector("img").src;   
        let container_img = order_table.querySelector(".img-order-form");
        container_img.innerHTML = `<img src=${img}>`;
      }
    });
  });

  order_table.onsubmit = (e) => {
    //NGĂN RELOAD TRANG
    e.preventDefault();

    //LẤY DỮ LIỆU TỪ FORM
    const data = new FormData(order_table);
    const quantity = data.get("quantity");

    //GỌI HÀM THÊM SẢN PHẨM
    addProduct(currentCard, quantity);

    alert("ĐÃ THÊM SẢN PHẨM VÀO GIỎ HÀNG");

    order_table.classList.remove("toggle");
  };

}


