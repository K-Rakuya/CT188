// Lấy danh sách các nút dịch trái phải
const btns_prev = document.querySelectorAll(".btn-prev");
const btns_next = document.querySelectorAll(".btn-next");

//Lấy các Slider track
const slider_track_list = document.querySelectorAll(".slider-track");

//Lấy độ rộng của card
const product_card_width = document.querySelector(".product-card").offsetWidth

//Lấy danh sách các sản phẩm cafe
const cafe_list = document.querySelectorAll(".product-card-cafe");

//độ dài của khung cửa sổ
const slider_Window_width = document.querySelector(".slider-window").offsetWidth;

pds_in_window = Math.floor(slider_Window_width/product_card_width)

let minOffset = - (cafe_list.length - pds_in_window) * product_card_width
let maxOffset = 0;
let offset = 0;

//Hàm dành cho nút prev
function slide_prev(){
    if(offset >= maxOffset) return;
    offset += product_card_width
    slider_track_list[0].style.transform = `translateX(${offset}px)`;

}

//Hàm dành cho nút next
function slide_next(){
    if(offset <= minOffset) return;
    offset -= product_card_width
    slider_track_list[0].style.transform = `translateX(${offset}px)`;
}

btns_prev[0].addEventListener("click", slide_prev)
btns_next[0].addEventListener("click", slide_next)




