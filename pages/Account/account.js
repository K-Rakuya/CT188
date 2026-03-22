// Avatar or Login Btn

const LoginBox = document.getElementById("login-container");
const Card = document.getElementById("button-card");
const Avt = document.getElementById("avatar");
const login = document.getElementById("login");
const register = document.getElementById("register");

const auth = (() => {
    let isLoged = 0;

    function updateUI() {
        setLoggedUI(isLoged);
    }

    return {
        login() {
            isLoged = 1;
            updateUI();
        },
        isLoged() {
            return isLoged;
        }
    };
})();

[login, register].forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        auth.login();
    });
});



function setLoggedUI(isLoged) {
    if (isLoged) {
        LoginBox.classList.add("hidden");
        Card.classList.remove("hidden");
        Avt.classList.remove("hidden");
    } else {
        Avt.classList.add("hidden");
        LoginBox.classList.remove("hidden");
        Card.classList.add("hidden");
    }
}

// Search 
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchForm = document.getElementById("searchForm");

let clickingSearchBtn = false;

searchBtn.addEventListener("mousedown", () => {
    clickingSearchBtn = true;
});

searchBtn.addEventListener("click", (e) => {
    if (!searchBox.value.trim() || !searchBox.classList.contains("show")) {
        e.preventDefault();
        searchForm.classList.add("expand");
        searchBox.classList.add("show");
        searchBox.focus();
        searchBtn.style.pointerEvents
    }
    clickingSearchBtn = false;
});

searchBox.addEventListener("blur", () => {
    if (clickingSearchBtn) return;

    searchBox.classList.remove("show");

    setTimeout(() => {
        searchForm.classList.remove("expand");
    }, 200);
});


let x = 0, y = 0;
let currentX = 0, currentY = 0;

const avatar = document.getElementById("avatar-container");

document.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 15;
    y = (e.clientY / window.innerHeight - 0.5) * 15;
})

function animate() {
    currentX += (x - currentX) * 0.01;
    currentY += (y - currentY) * 0.01;
    avatar.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
    requestAnimationFrame(animate);
}
animate();

const userForm = document.getElementById("user-information-form");
const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address_input");

function loadUserData() {
    const storedUser = getCurrentUser();

    if (storedUser) {
        // Điền dữ liệu vào các ô input
        usernameInput.value = storedUser.username || "";
        phoneInput.value = storedUser.phone || "";
        emailInput.value = storedUser.email || "";
        addressInput.value = storedUser.address || "";

        // Cập nhật tên hiển thị ở phần #short-info
        const shortInfoName = document.querySelector("#short-info h1");
        if (shortInfoName && storedUser) {
            shortInfoName.textContent = storedUser.fullName || storedUser.username || "Người dùng ẩn danh";
        }
    }
}

userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let currentUser = getCurrentUser();

    // Cập nhật thông tin mới từ các ô input
    currentUser.fullName = usernameInput.value;
    currentUser.phone = phoneInput.value;
    currentUser.email = emailInput.value;
    currentUser.address = addressInput.value;

    saveCurrentUser(currentUser);

    alert("Đã lưu thông tin tài khoản thành công!");

    // Cập nhật lại UI hiển thị tên
    const shortInfoName = document.querySelector("#short-info h1");
    if (shortInfoName) shortInfoName.textContent = currentUser.fullName;
});

loadUserData();


// Quản lí users

// Hàm lấy danh sách tất cả users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Hàm lấy ra user đang đăng nhập
function getCurrentUser() {
    const users = getAllUsers();
    const loggedInId = localStorage.getItem('loggedInId');

    if (!loggedInId) return null;

    return users.find(user => user.id === loggedInId);
}

// Hàm lưu user
function saveCurrentUser(updatedUser) {
    let users = getAllUsers();

    const index = users.findIndex(user => user.id === updatedUser.id);

    if (index !== -1) {
        users[index] = updatedUser;
    } else {
        users.push(updatedUser);
    }

    // Lưu lại
    localStorage.setItem('users', JSON.stringify(users));
}