
// const registerForm = document.querySelector('.form-register');
// const contactInput = document.querySelector('#contact');

// const username = document.querySelector(".username");
// const passwd = document.querySelector(".password");

// function validateRegister() {
//     const value = contactInput.value.trim();
    

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    

//     const phoneRegex = /^(0|84)\d{9}$/;


//     if (value === "") {
//         alert("Vui lòng không để trống trường Email hoặc Số điện thoại!");
//         return false;
//     }


//     if (emailRegex.test(value)) {
//         return true; 
//     } else if (phoneRegex.test(value)) {
//         return true; 
//     } else {
//         alert("Định dạng không hợp lệ! Vui lòng nhập Email hoặc Số điện thoại (10 số).");
//         return false;
//     }
// }


// if (registerForm) {
//     registerForm.addEventListener('submit', (e) => {

//         e.preventDefault();


//         if (validateRegister()) {
//             alert("Đăng ký thành công! Chào mừng bạn đến với Refreshing Journey.");
//             alert("bạn đã tạo tài khoản thành công !")
//             localStorage.setItem('username', username.value);
//             localStorage.setItem('account-Name', username.value);
//             localStorage.setItem('account-Passwd',passwd.value);
//             window.location.href = './login.html';
//         }
//     });
// }


// Hàm lấy danh sách tất cả users 
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

const registerForm = document.querySelector('.form-register');
const usernameInput = document.querySelector('#username');
const contactInput = document.querySelector('#contact'); // Email hoặc SĐT
const passwordInput = document.querySelector('#password');

// Hàm kiểm tra định dạng
function validateRegister(contactValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|84)\d{9,10}$/;

    if (emailRegex.test(contactValue)) {
        return { type: 'email', value: contactValue };
    } else if (phoneRegex.test(contactValue)) {
        return { type: 'phone', value: contactValue };
    } else {
        alert("Định dạng Email hoặc Số điện thoại không hợp lệ!");
        return null;
    }
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const contact = contactInput.value.trim();
        const password = passwordInput.value.trim();

        const contactInfo = validateRegister(contact);
        if (!contactInfo) return;

        // Lấy danh sách users hiện tại
        let users = getAllUsers();

        // Kiểm tra trùng lặp (Username hoặc Email/SĐT)
        const isExist = users.find(user => 
            user.username === username || 
            user.email === contact || 
            user.phone === contact
        );

        if (isExist) {
            alert("Tên đăng nhập hoặc thông tin liên hệ đã tồn tại!");
            return;
        }

        // Tạo Object User 
        const newUser = {
            id: "user_" + Date.now(),
            username: username,
            password: password,
            email: contactInfo.type === 'email' ? contactInfo.value : "",
            phone: contactInfo.type === 'phone' ? contactInfo.value : "",
            cart: [],
            avatar: "/assets/Avatar/avatar.png" 
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Đăng ký thành công! Hệ thống sẽ chuyển bạn sang trang Đăng nhập.");
        
        window.location.href = '../login/login.html'; 
    });
}

// Logic ẩn hiện mật khẩu
const togglePassword = document.querySelector("#togglePassword");
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-lock");
    });
}