// Avatar or Login Btn

const LoginBox = document.getElementById("login-container");
const Card = document.getElementById("button-card");
const Avt = document.getElementById("avatar");
const login = document.getElementById("login");
const register = document.getElementById("register");
let isLoged = 0;

const auth = (() => {

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


login.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "pages/login/login.html";
});

register.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "pages/register/register.html";
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

window.addEventListener('load', () => {
    let currentUser = getCurrentUser();
    if (currentUser) isLoged = 1;
    setLoggedUI(isLoged);
})

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

// Hàm tạo Toast Notification
function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Tạo thẻ div
    const toast = document.createElement('div');
    toast.classList.add('custom-toast', `toast-${type}`);

    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';

    toast.innerHTML = `${icon}<span class="toast-msg">${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
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

    showToast("Đã lưu thông tin người dùng", 'success')

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

// upload avatar logic

const avatarContainer = document.getElementById("avatar-container");
const avatarUpload = document.getElementById("avatar-upload");
const avatarPreview = avatarContainer.querySelector("img");
const navAvatar = document.querySelector("#avatar-wrapper > a > img");

avatarContainer.addEventListener("click", () => {
    avatarUpload.click();
});

avatarUpload.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64Image = e.target.result;
        avatarPreview.src = base64Image;
        navAvatar.src = base64Image;


        // Lưu vào thông tin của user đang đăng nhập
        let user = getCurrentUser() || {};
        user.avatar = base64Image;

        try {
            saveCurrentUser(user);
        } catch (error) {
            alert("Ảnh quá nặng, không thể lưu vào localStorage!");
        }
    };

    reader.readAsDataURL(file);
});

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = getCurrentUser();
    if (currentUser) {
        avatarPreview.src = currentUser.avatar;
        navAvatar.src = currentUser.avatar;
    }
})

// Logout Btn

const logOutBtn = document.querySelector("#logout-btn");
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("loggedInId");
    isLoged = 0;
    setLoggedUI(isLoged);
})


// Address logic
const deleteAddress = document.querySelector("#user-information-form > div:nth-child(4) > div > div > button");

deleteAddress.addEventListener('click', () => {
    addressInput.value = "";
})


// Nav mobile
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const dropdownMenuLinks = document.getElementById('dropdown-menu-links');

    if (hamburgerBtn && dropdownMenuLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenuLinks.classList.toggle('show');
            const icon = hamburgerBtn.querySelector('i');
            if (dropdownMenuLinks.classList.contains('show')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        document.addEventListener('click', (e) => {
            if (!dropdownMenuLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                dropdownMenuLinks.classList.remove('show');
                hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }
});

// Cart Btn

const cartBtn = document.querySelector("#button-cart_img");
cartBtn.addEventListener('click', () => {
    window.location.href = "/pages/cart/cart.html"
})