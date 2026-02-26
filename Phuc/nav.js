const btn_menu = document.querySelector(".header-menu-btn");
const menu = document.querySelector(".header_nav");
const header_top = document.querySelector(".header_top");
let height_of_header = header_top.offsetHeight;

function update_header_height(){
  height_of_header = header_top.offsetHeight;
}

update_header_height();
window.addEventListener("resize", update_header_height);

btn_menu.addEventListener("click", () => {  
  menu.classList.toggle("active");
});



