// 1. Lấy các phần tử từ DOM
const registerForm = document.querySelector('.form-register');
const contactInput = document.querySelector('#contact');
const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

// --- CHỨC NĂNG 1: Ẩn/Hiện mật khẩu ---
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-lock');
    });
}


function validateRegister() {
    const value = contactInput.value.trim();
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

    const phoneRegex = /^(0|84)\d{9}$/;


    if (value === "") {
        alert("Vui lòng không để trống trường Email hoặc Số điện thoại!");
        return false;
    }


    if (emailRegex.test(value)) {
        return true; 
    } else if (phoneRegex.test(value)) {
        return true; 
    } else {
        alert("Định dạng không hợp lệ! Vui lòng nhập Email hoặc Số điện thoại (10 số).");
        return false;
    }
}


if (registerForm) {
    registerForm.addEventListener('submit', (e) => {

        e.preventDefault();


        if (validateRegister()) {
            alert("Đăng ký thành công! Chào mừng bạn đến với Refreshing Journey.");

        }
    });
}