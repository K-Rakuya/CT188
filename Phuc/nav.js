const btn_menu = document.querySelector(".header-menu-btn");
const menu = document.querySelector(".header_nav");
const header = document.querySelector(".header");

function update_size(){
  let height_of_header = header.offsetHeight;
  menu.style.top = height_of_header + "px";
}

update_size();
window.addEventListener("resize", update_size);

btn_menu.addEventListener("click", () => {
  menu.classList.toggle("active");
});