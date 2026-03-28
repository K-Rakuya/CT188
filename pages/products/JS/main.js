import {render} from "./render.js"
import {getNameFromSearch, searchProducts} from "./search.js"
import {showProductNeed} from "./showPD.js"


//HÀM CẬP NHẬT LẠI GIỚI HẠN SẢN PHẨM XEM (GỌI MỖI KHI RESIZE)
function update_limit(){
  let current_width_window = window.innerWidth;
  if(current_width_window < 768){
    base_limit = limit_mobile;
  }
  else if(current_width_window < 1024){
   base_limit = limit_tablet;
  }
  else{
    base_limit = limit_laptop;
  }
  return base_limit;
}

//HÀM CHỌN LOẠI SẢN PHẨM KHI NHẤN VÀO THANH MENU
function choose_type(){
  const menu = document.querySelector(".sidebar ul");
  //GẮN SỰ KIỆN CHO NÚT
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      let cate = e.target.dataset.category;

      //SAU KHI NHẤN XONG PHẢI CẬP NHẬT LẠI SỐ LƯỢNG SẢN PHẨM ĐANG HIỂN THỊ
      current_limit = base_limit;
      currentFilter = cate;
      
      let list_li = menu.querySelectorAll(".option-category");
      
      //SET MÀU TRÊN THANH MENU, HỖ TRỢ NGƯỜI DÙNG
      list_li.forEach(element  =>{
        element.style.color = `black`;
      });
      
      if(cate != "All"){
        e.target.style = `color: #FF6666`;
      }

      render(allProducts, currentFilter, current_limit);
    }
  });
}

//HÀM HIỂN THỊ THÊM SẢN PHẨM
function showMore(){
  const btn_show_more = document.querySelector(".button-show-pd");
  //GẮN SỰ KIỆN CHO NÚT THÊM SẢN PHẨM
  btn_show_more.addEventListener("click", ()=>{
    current_limit += base_limit;
    render(allProducts, currentFilter, current_limit);
  })
}


//MAIN
//DÙNG EXPORT ĐỂ CÁC FILE KHÁC TRUY CẬP ĐƯỢC DANH SÁCH SẢN PHẨM
export let allProducts = [];

// ĐỌC DƯ LIỆU TỪ FILE JSON
// NẾU CHỈ 1 TRONG 3 LỆNH FETCH KHÔNG ĐỌC ĐƯỢC, HÀM SẼ LỖI
Promise.all([
  fetch("Cafe/data_coffee.json").then(res => res.json()),
  fetch("Tea/data_tea.json").then(res => res.json()),
  fetch("Freeze/data_freeze.json").then(res => res.json())
])
.then(([coffee, tea, freeze]) => {
  allProducts = [...coffee, ...tea, ...freeze];
  //GỘP 3 MẢNG GIÁ TRỊ THÀNH 1 MẢNG TẤT CẢ SẢN PHẨM
  render(allProducts, "All");
  //GỌI HÀM RENDER ĐỂ HIỆN THỊ TRÊN HTML
});


//KHỞI TẠO HIỂN THỊ TẤT CẢ SẢN PHẨM
let currentFilter = "All";

//CÁC MỐC GIỚI HẠN SẢN PHẨM THEO RESPONSIVE
let limit_mobile = 8;
let limit_tablet = 15;
let limit_laptop = 24;
let base_limit = 0;

base_limit = update_limit();
let current_limit = base_limit;

//SET TIME ĐỂ TRÁNH PHẢI RENDER LIÊN TỤC KHI ĐANG RESIZE
let time;
window.addEventListener("resize", ()=>{
  clearTimeout(time);
  time = setTimeout(()=>{
    let oldBase = base_limit;
    update_limit();
    current_limit = Math.ceil(current_limit / oldBase) * base_limit;
    render(allProducts, currentFilter, current_limit);
  }, 500);
})

//GỌI HÀM
choose_type();
showMore();


//XỬ LÍ VIỆC TÌM KIẾM 
const inputFromUser = document.querySelector("#search-product");

inputFromUser.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      //LẤY TÊN SẢN PHẨM NGƯỜI DÙN NHẬP
      let name_product = getNameFromSearch();

      //GỌI HÀM TÌM SẢN PHẨM
      let list_products = searchProducts(allProducts, name_product);
      
      //GỌI HÀM HIỂN THỊ SẢN PHẨM NGƯỜI DÙNG CẦN
      showProductNeed(list_products);
    }
});