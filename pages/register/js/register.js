/*LẤY DỮ LIỆU TỪ LOCALSTORAGE */
function getAllUsers() {
    // Chuyển chuỗi JSON từ localStorage thành mảng Object, nếu chưa có thì trả về mảng rỗng []
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Khai báo các thành phần giao diện
const registerForm = document.querySelector('.form-register');
const usernameInput = document.querySelector('#username');
const contactInput = document.querySelector('#contact'); // Ô nhập Email hoặc SĐT
const passwordInput = document.querySelector('#password');

/*HÀM KIỂM TRA ĐỊNH DẠNG */
function validateRegister(contactValue) {
    // Regex kiểm tra cấu trúc Email chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex kiểm tra số điện thoại Việt Nam 0 hoặc 84
    const phoneRegex = /^(0|84)\d{9,10}$/;

    if (emailRegex.test(contactValue)) {
        // Nếu là email, trả về một Object đánh dấu loại là 'email'
        return { type: 'email', value: contactValue };
    } else if (phoneRegex.test(contactValue)) {
        // Nếu là SĐT, trả về Object đánh dấu loại là 'phone'
        return { type: 'phone', value: contactValue };
    } else {
        // Nếu không khớp cả hai thì báo lỗi
        alert("Định dạng Email hoặc Số điện thoại không hợp lệ!");
        return null;
    }
}

/*XỬ LÝ KHI NGƯỜI DÙNG NHẤN ĐĂNG KÝ*/
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn form load lại trang

        const username = usernameInput.value.trim();
        const contact = contactInput.value.trim();
        const password = passwordInput.value.trim();

        // Bước 1: Kiểm tra xem định dạng nhập vào là Email hay SĐT
        const contactInfo = validateRegister(contact);
        if (!contactInfo) return; // Nếu null thì dừng lại luôn

        // Bước 2: Lấy danh sách users cũ để kiểm tra trùng lặp
        let users = getAllUsers();

        // Bước 3: Kiểm tra xem Tên đăng nhập / Email / SĐT đã có ai dùng chưa
        const isExist = users.find(user => 
            user.username === username || 
            user.email === contact || 
            user.phone === contact
        );

        if (isExist) {
            alert("Tên đăng nhập hoặc thông tin liên hệ đã tồn tại!");
            return;
        }

        // Bước 4: Tạo Object User mới với các trường dữ liệu cần thiết
        const newUser = {
            // Tạo ID duy nhất bằng cách kết hợp chữ và thời gian hiện tại 
            id: "user_" + Date.now(), 
            username: username,
            password: password,
            // Nếu khách nhập email thì lưu vào cột email, ngược lại để trống 
            email: contactInfo.type === 'email' ? contactInfo.value : "",
            phone: contactInfo.type === 'phone' ? contactInfo.value : "",
            cart: [], // Khởi tạo giỏ hàng rỗng cho user mới
            avatar: "/assets/Avatar/avatar.png" // Ảnh đại diện mặc định
        };

        // Bước 5: Thêm vào mảng và lưu lại vào LocalStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Đăng ký thành công! Hệ thống sẽ chuyển bạn sang trang Đăng nhập.");
        
        // Chuyển hướng người dùng sang trang login
        window.location.href = '../login/login.html'; 
    });
}

/*TÍNH NĂNG ẨN/HIỆN MẬT KHẨU*/
const togglePassword = document.querySelector("#togglePassword");
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        // Đảo ngược type giữa text và password
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Đổi icon con mắt
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-lock");
    });
}