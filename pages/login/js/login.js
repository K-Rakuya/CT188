//LẤY DỮ LIỆU TỪ LOCALSTORAGE
function getAllUsers() {
    // Lấy chuỗi JSON từ localStorage
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Lấy các phần tử giao diện cần thiết
const form = document.querySelector(".form-login");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

/*HÀM XỬ LÝ XÁC THỰC */
const authentication = () => {
    const users = getAllUsers(); // Lấy danh sách toàn bộ user đã đăng ký
    const valUser = usernameInput.value.trim(); // Lấy tên đăng nhập/SĐT (xóa khoảng trắng thừa)
    const valPass = passwordInput.value.trim(); // Lấy mật khẩu

    // Dùng hàm để tìm 1 user duy nhất khớp với thông tin nhập vào
    const user = users.find(u =>
        // Khớp Username HOẶC số điện thoại VÀ phải khớp đúng Mật khẩu
        (u.username === valUser || u.phone === valUser) && u.password === valPass
    );

    if (user) {
        // Nếu tìm thấy: Lưu ID của user vào localStorage đe đánh dấu "Đã đăng nhập"
        localStorage.setItem('loggedInId', user.id);
        // Chuyển hướng về trang chủ
        window.location.href = '/index.html'; 
    }
    else {
        // Nếu không tìm thấy hoặc sai thông tin
        alert("Tài khoản hoặc mật khẩu không đúng. Kiểm tra lại nhé!");
    }
};

//LẮNG NGHE SỰ KIỆN SUBMIT FORM 
if (form) {
    form.addEventListener('submit', (e) => {
        // Ngăn chặn hành động load lại trang
        e.preventDefault();
        authentication();
    });
}

/*TÍNH NĂNG ẨN/HIỆN MẬT KHẨU */
const togglePassword = document.querySelector("#togglePassword");
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        // Kiểm tra loại input hiện tại, nếu là password thì đổi thành text và ngược lại
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Thay đổi icon con mắt sang icon ổ khóa hoặc mắt gạch chéo
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-lock"); 
    });
}