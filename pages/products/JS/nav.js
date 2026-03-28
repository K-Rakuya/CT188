import {isLoggedIn} from "./isLogged.js"
const burger_btn = document.querySelector('.burger-menu');
const features_list = document.querySelector('.features-list');

//THÊM SỰ KIỆN CHO NÚT MENU BURER
burger_btn.addEventListener('click', () => {
  //BẬT HOẶC TẮT LIST ĐIỀU HƯỚNG
  features_list.classList.toggle('active');
})

const user_icon = document.querySelector(".user-cart");
user_icon.addEventListener("click", ()=>{
  if(isLoggedIn()){
    //NẾU NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP THÌ CHUYỂN ĐẾN TRANG ACCOUNT
    window.location.href = "/pages/Account/account.html";
  }

  else{
    //NẾU CHƯA ĐĂNG NHẬP THÌ CHUYỂN ĐẾN TRANG ĐĂNG NHẬP
    window.location.href ="/pages/login/login.html";
  }
})



