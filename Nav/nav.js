import {isLoggedIn} from "../CheckUser/isLogged.js"
const burger_btn = document.querySelector('.burger-menu');
const features_list = document.querySelector('.features-list');
burger_btn.addEventListener('click', () => {
  features_list.classList.toggle('active');
})

const user_icon = document.querySelector(".user-cart");
user_icon.addEventListener("click", ()=>{
  if(isLoggedIn()){
    window.location.href = "Account/account.html";
  }
  else{
    window.location.href ="Register/register.html";
  }
})

