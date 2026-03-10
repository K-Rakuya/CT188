
const registerForm = document.querySelector('.form-register');
const contactInput = document.querySelector('#contact');

const username = document.querySelector(".username");
const passwd = document.querySelector(".password");

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
            alert("bạn đã tạo tài khoản thành công !")
            localStorage.setItem('username', username.value);
            localStorage.setItem('account-Name', username.value);
            localStorage.setItem('account-Passwd',passwd.value);
            window.location.href = './login.html';
        }
    });
}


