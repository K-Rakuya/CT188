

// const usernameLogin = localStorage.getItem('account-Name');
// const passwdLogin = localStorage.getItem('account-Passwd');

// const username = document.querySelector("#username");
// const password = document.querySelector("#password");
// const form = document.querySelector(".form-login");

// localStorage.setItem('login' ,window.location.href );

// const authentication = () => {

//     if(username.value === usernameLogin && password.value === passwdLogin){
//       localStorage.setItem('isLoggedIn','true');
//       localStorage.setItem('username' , usernameLogin);
//         alert("đăng nhập thành công");
//         const redirect = localStorage.getItem('redirectURL');
//         localStorage.removeItem('redirectURL')
//         if(redirect) window.location.href = redirect;
//         window.location.href = '/vohangtemp/index.html'

//     }else{
//         alert("đăng nhập không thành công! sai tên hoặc sai passwd");
//     }
// }


// if(form){
//     form.addEventListener('submit',(e)=>{
//         e.preventDefault(); 
//         authentication();
//     });
// }

// Hàm lấy danh sách tất cả users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

const form = document.querySelector(".form-login");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const authentication = () => {
    const users = getAllUsers();
    const valUser = usernameInput.value.trim();
    const valPass = passwordInput.value.trim();

    // Tìm user có username (hoặc SĐT) và password khớp
    const user = users.find(u =>
        (u.username === valUser || u.phone === valUser) && u.password === valPass
    );

    if (user) {
        localStorage.setItem('loggedInId', user.id);
        alert("Đăng nhập thành công!");
        window.location.href = '/index.html'; // Phi thẳng về trang chủ
    }
    else {
        alert("Tài khoản/mật khẩu không khớp");
    }
};

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        authentication();
    });
}

const togglePassword = document.querySelector("#togglePassword");
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-lock");
    });
}