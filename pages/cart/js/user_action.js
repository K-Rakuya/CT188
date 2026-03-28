const authLink = document.querySelector('.action-user');
const username = document.querySelector(".name-user");
const avt_user = document.querySelector("#img-avt-user");
const placeOder = document.querySelector("#btn-place");
const checkLogged=() => localStorage.getItem('loggedInId');
let isLogged = checkLogged;

function auth(){
   const isLoggedNow = checkLogged();
   if(isLoggedNow){
      avt_user.src = "img/avt.jpg";
      authLink.textContent = "Log Out";
      avt_user.classList.add("active");
      authLink.classList.add("active");
      username.textContent = localStorage.getItem('username');
   }
   if(!isLoggedNow){
      authLink.textContent = "Login";
   }
}

auth();

function Auth_Login_LogOut(){
   authLink.addEventListener('click' , (e) =>{
      const isLoggedNow = checkLogged();
      if(isLoggedNow){
         alert("bạn đang đăng xuất")
         localStorage.setItem('redirectURL',window.location.href);
         localStorage.removeItem('isLoggedIn');
         localStorage.removeItem('username');
         avt_user.src = "";
         window.location.reload();
         e.preventDefault(); 
      }
      if(!isLoggedNow){
         e.preventDefault();
         alert("bạn đang được chuyển sang trang đăng nhập")
         localStorage.setItem('redirectURL',window.location.href);
         window.location.href = '/DUY/draff2/login.html';
         
      }
   })
}

placeOder.addEventListener(('click') , ()=>{
   if(!isLogged){
      e.preventDefault(); 
      alert("bạn cần đăng nhập mới đặt được hàng ! chúng tôi sẽ chuyển bạn đến trang đăng nhập ");
      localStorage.setItem('redirectURL', window.location.href);
      window.location.href = localStorage.getItem('login');
      // window.location.href = "../DUY/daff2/login.html"
   }
   
})

Auth_Login_LogOut();

function getCurrentUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInId = localStorage.getItem('loggedInId');
    return users.find(user => user.id === loggedInId);
}

const updateHeaderInfo = () => {
    const currentUser = getCurrentUser();
    const nameDisplay = document.getElementById('name-user');
    const avatarDisplay = document.getElementById('img-avt-user');
    const actionUser = document.querySelector('.action-user');

    if (currentUser) {
        // Hiển thị tên và ảnh
        nameDisplay.textContent = currentUser.username;
        avatarDisplay.src = currentUser.avatar || "/assets/Avatar/avatar.png";
        
        // Đổi link Logout
        if(actionUser) {
            actionUser.textContent = "Logout";
            actionUser.href = "#";
            actionUser.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('loggedInId'); // Xóa trạng thái đăng nhập
                window.location.href = "/index.html"; 
            };
        }
    } else {
        // Nếu chưa đăng nhập, đá về trang login (Bảo vệ trang giỏ hàng)
        alert("Vui lòng đăng nhập để xem giỏ hàng!");
        window.location.href = "../login/login.html"; 
    }
};

// Chạy khi trang load xong
document.addEventListener('DOMContentLoaded', updateHeaderInfo);

