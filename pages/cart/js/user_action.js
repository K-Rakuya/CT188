
const authLink = document.querySelector('.action-user'); // Nút Login/Logout
const username = document.querySelector(".name-user");   // Chỗ hiển thị tên user
const avt_user = document.querySelector("#img-avt-user"); // Thẻ ảnh đại diện
const placeOder = document.querySelector("#btn-place");   // Nút đặt hàng

// HÀM KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
// Kiểm tra xem trong LocalStorage có ID của user đang login không
const checkLogged = () => localStorage.getItem('loggedInId');
let isLogged = checkLogged(); // Lấy trạng thái hiện tại 


function auth() {
    const isLoggedNow = checkLogged();
    if (isLoggedNow) {
        // Nếu đã login: Hiển thị avatar mặc định và tên user
        avt_user.src = "img/avt.jpg";
        authLink.textContent = "Log Out";
        avt_user.classList.add("active");
        authLink.classList.add("active");
        username.textContent = localStorage.getItem('username');
    }
    if (!isLoggedNow) {
        // Nếu chưa login: Hiển thị nút Login
        authLink.textContent = "Login";
    }
}

// Chạy hàm kiểm tra hiển thị ngay khi file load
auth();

/*XỬ LÝ SỰ KIỆN CLICK LOGIN / LOGOUT*/
function Auth_Login_LogOut() {
    authLink.addEventListener('click', (e) => {
        const isLoggedNow = checkLogged();
        
        // ĐANG LOGGED IN MUỐN LOG OUT
        if (isLoggedNow) {
            // Lưu URL hiện tại để sau khi login lại có thể quay lại đúng trang này
            localStorage.setItem('redirectURL', window.location.href);
            
            // Xóa các key liên quan đến phiên đăng nhập
            localStorage.removeItem('loggedInId'); 
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            
            avt_user.src = ""; // Xóa ảnh đại diện
            window.location.reload(); // Tải lại trang để cập nhật giao diện
            e.preventDefault(); 
        } 
        //CHƯA LOGIN MUỐN CHUYỂN SANG TRANG LOGIN
        else {
            e.preventDefault();
            // Lưu lại vị trí trang hiện tại để login xong quay lại đây
            localStorage.setItem('redirectURL', window.location.href);
            window.location.href = '/DUY/draff2/login.html';
        }
    });
}

// Kích hoạt lắng nghe sự kiện Click cho nút Auth
Auth_Login_LogOut();

/*NÚT ĐẶT HÀNG (CHỈ CHO ĐẶT KHI ĐÃ LOGIN) */
placeOder.addEventListener('click', (e) => { 
    const isLoggedNow = checkLogged(); // Check lại trạng thái mới nhất
    if (!isLoggedNow) {
        e.preventDefault(); // Ngăn hành động đặt hàng
        alert("Bạn cần đăng nhập mới đặt được hàng! Chúng tôi sẽ chuyển bạn đến trang đăng nhập.");
        // Lưu URL để quay lại sau khi login
        localStorage.setItem('redirectURL', window.location.href);
        // Chuyển hướng đến trang login
        window.location.href = '../login/login.html'; 
    }
});

/*LẤY DATA TỪ DANH SÁCH USERS */

// Hàm tìm object user đầy đủ dựa trên ID đang lưu trong máy
function getCurrentUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInId = localStorage.getItem('loggedInId');
    return users.find(user => user.id === loggedInId);
}

// Hàm cập nhật thông tin User lên Header (Lấy dữ liệu từ mảng Users)
const updateHeaderInfo = () => {
    const currentUser = getCurrentUser();
    const nameDisplay = document.getElementById('name-user');
    const avatarDisplay = document.getElementById('img-avt-user');
    const actionUser = document.querySelector('.action-user');

    if (currentUser) {
        // HIỂN THỊ THÔNG TIN USER NẾU CÓ TRONG DANH SÁCH
        nameDisplay.textContent = currentUser.username;
        // Nếu user có link ảnh thì hiện, không thì hiện ảnh mặc định
        avatarDisplay.src = currentUser.avatar || "/assets/Avatar/avatar.png";
        
        // Cấu hình nút Logout
        if (actionUser) {
            actionUser.textContent = "Log Out";
            actionUser.href = "#";
            actionUser.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem('loggedInId'); // Xóa ID đăng nhập
                alert("Đăng xuất thành công!");
                window.location.href = "/index.html"; 
            };
        }
    } else {
        /*Đoạn này sẽ đá người dùng ra trang login nếu họ cố tình vào trang giỏ hàng khi chưa đăng nhập.
         */
        if (window.location.pathname.includes("cart.html")) {
            alert("Vui lòng đăng nhập để xem giỏ hàng!");
            window.location.href = "../login/login.html"; 
        }
    }
};

// Đảm bảo thông tin Header được cập nhật ngay khi cây DOM sẵn sàng
document.addEventListener('DOMContentLoaded', updateHeaderInfo);