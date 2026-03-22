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

searchBtn.addEventListener("pointerdown", () => {
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

// Animate Banner

// Parallax

const banner_item = document.getElementById("banner-item");

// let x = 0;
// let y = 0;
// let currentX = 0;
// let currentY = 0;

// function updatePointer(e) {
//     x = (e.clientX / window.innerWidth - 0.5) * 20;
//     y = (e.clientY / window.innerHeight - 0.5) * 20;
// }

// document.addEventListener("pointermove", updatePointer);
// document.addEventListener("pointerdown", updatePointer);

// function animate() {
//     currentX += (x - currentX) * 0.01;
//     currentY += (y - currentY) * 0.01;

//     banner_item.style.transform = "translate(" + currentX + "px, " + currentY + "px) scale(1.05)";

//     requestAnimationFrame(animate);
// }

// animate();

// Slide banner

const banner = document.querySelector("#main-banner-wrapper > img");
const banner_dots = document.querySelectorAll(".dot");

function setActiveDot(index) {
    banner_dots.forEach(dot => dot.classList.remove("active"));
    banner_dots[index].classList.add("active");
}

let banner_items = [];
let banner_images = [
    "assets/data/home/banner1.jpg",
    "assets/data/home/banner2.jpg",
    "assets/data/home/banner3.jpg"
];
let banner_items_img = [
    "/assets/data/home/item1.png",
    "/assets/data/home/item2.png",
    "/assets/data/home/item3.png",
];

// Đi lấy dữ liệu JSON
fetch("assets/data/home/banner.json")
    .then(res => res.json())
    .then(data => {
        banner_items = data;

        if (banner_items.length > 0) {
            banner_images = banner_items.slice(0, 3).map(item => item.bannerUrl);
            banner_items_img = banner_items.slice(0, 3).map(item => item.itemUrl);

            banner.src = banner_images[0];
            banner_item.querySelector("img").src = banner_items_img[0];
            setActiveDot(0);

            // Lấy thẳng title và Description từ object số 0
            if (bannerItemTitle) bannerItemTitle.textContent = banner_items[0].title;
            if (bannerItemDesc) bannerItemDesc.textContent = banner_items[0].Description;

            autoChangeBanner();
        }
    });

let bannerStartX = 0;
let bannerIsDrag = false;
let bannerIndex = 0;
let bannerOffset = 0;

banner.addEventListener("pointerdown", (e) => {
    bannerIsDrag = true;
    bannerStartX = e.clientX;
    banner.style.transition = "none";
});

document.addEventListener("pointermove", (e) => {
    if (!bannerIsDrag) return;

    let diff = e.clientX - bannerStartX;
    diff = Math.max(-900, Math.min(900, diff))
    bannerOffset = diff * (0.03);


    banner.style.transform = 'translateX(' + bannerOffset + 'px)';
});

document.addEventListener("pointerup", () => {
    if (!bannerIsDrag) return;
    bannerIsDrag = false;

    let direction = bannerOffset < 0 ? -1 : 1;
    if (bannerOffset == 0) direction = -1;
    // cập nhật index
    if (direction < 0) {
        bannerIndex = (bannerIndex + 1) % banner_images.length;
    } else {
        bannerIndex = (bannerIndex - 1 + banner_images.length) % banner_images.length;
    }

    ChangeBanner(bannerIndex, direction);
});

function ChangeBanner(bannerIndex, direction) {
    banner.style.transition = "opacity 0.3s ease";
    banner.style.opacity = "0";
    setTimeout(() => {
        change_banner_item(bannerIndex);
    }, 100);

    setTimeout(() => {
        setActiveDot(bannerIndex);
        banner.src = banner_images[bannerIndex];

        // đặt ảnh mới
        banner.style.transition = "none";
        banner.style.transform = `translateX(${-direction * 5}%)`;

        // đọc một thuộc tính để ép broser render transform trước
        banner.offsetHeight;

        banner.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        banner.style.transform = "translateX(0)";
        banner.style.opacity = "1";

    }, 300);
}

function autoChangeBanner() {
    setTimeout(() => {
        bannerIndex = (bannerIndex + 1) % banner_images.length;
        ChangeBanner(bannerIndex, -1);
        autoChangeBanner();
    }, 7000)
}

function change_banner_item(bannerIndex) {
    banner_item.firstChild.style.transition = "transform 0.3s ease, opacity .3s ease";
    banner_item.firstChild.style.transform = "scale(0.6)";
    banner_item.firstChild.style.opacity = 0;

    setTimeout(() => {
        // đặt ảnh mới
        banner_item.firstChild.src = banner_items_img[bannerIndex];
        banner_item.firstChild.style.transition = "none";
        banner_item.firstChild.style.transform = "scale(1.3)";

        // đọc một thuộc tính để ép broser render transform trước
        banner_item.firstChild.offsetHeight;

        banner_item.firstChild.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        banner_item.firstChild.style.transform = "scale(1)";
        banner_item.firstChild.style.opacity = "1";
        bannerItemTitle.textContent = banner_items[bannerIndex].title;
        bannerItemDesc.textContent = banner_items[bannerIndex].Description;
    }, 300);
}



// Add banner item

banner_item.innerHTML =
    '<img src="" alt="">' +
    '<div><h1 id="banner-title">Loading...</h1><p id="banner-desc"></p></div>' +
    '<button id="banner-buy-btn">Buy Now!</button>';

const bannerItemTitle = document.querySelector("#banner-item > div > h1");
const bannerItemDesc = document.querySelector("#banner-item > div > p");

// Grid Items


const grid = document.getElementById("main-grid-items")

var grid_items = [];

fetch("/assets/data/items.json")
    .then(res => res.json())
    .then(data => {
        grid_items = data;
        renderItems(grid_items);
    })


function renderItems(grid_items) {
    let htmlContent = "";

    grid_items.forEach((item, index) => {
        const delay = index * 0.05;
        htmlContent += `
        <div class="item-card flyIn radius-auto liquid-background card-backdrop card-border gap-2" 
                 style="animation-delay: ${delay}s;">
                <div class="item-wrapper flex-center flex-col gap-2">
                    <div class="item-banner img-crop radius-auto img-shadow">
                        <img src="/assets/images/${item.img}" loading="lazy">
                    </div>
                    <h3>${item.name}</h3>
                    <div class="relative flex gap-4 price">
                        <span class="before-sale">${item.oldPrice}$</span>
                        <span class="after-sale">${item.newPrice}$</span>
                    </div>
                    <div class="flex gap-12" style="width: 85%;">
                        <button class="item-buy-btn btn-background radius-all-sm btn-shadow" data-name="${item.name}">Buy</button>
                        <button class="more-btn btn-background radius-all-md btn-shadow" style="aspect-ratio: 1/1">⋯</button>
                    </div>
                </div>
            </div>`;
    });

    grid.innerHTML = htmlContent; // Gán 1 lần duy nhất vào DOM
}


// Buy Button

grid.addEventListener("mouseover", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;

    if (auth.isLoged()) {
        btn.textContent = "Add to Cart";
    } else {
        btn.textContent = "Login / Register";
    }
}, true);

grid.addEventListener("mouseleave", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;

    btn.textContent = "Buy";
}, true);

// Toggle List Item Side Bar

const listItemSideBarBtn = document.getElementById("filterPannel")
const mainGridItem = document.getElementById("main-grid-items")
const listItemSidePannel = document.getElementById("listItem-side-pannel")

listItemSideBarBtn.addEventListener("click", () => {
    mainGridItem.classList.toggle("collaps")
    listItemSidePannel.classList.toggle("show")
})

// Clear check box

const clearCheckbox = document.getElementById("clearCheckBoxBtn");
const checkBoxs = listItemSidePannel.querySelectorAll("input")

clearCheckbox.addEventListener("click", () => {
    checkBoxs.forEach(checkBox => {
        checkBox.checked = false;
    })
})

// Changemode to listItem

const toolBarBtn = document.querySelector('#toolBar img');
const gridContainer = document.querySelector('#main-grid-items');

toolBarBtn.addEventListener('click', () => {
    // làm mờ
    gridContainer.classList.add('loading-overlay');

    setTimeout(() => {
        gridContainer.classList.toggle('is-list');

        // xoá mờ
        gridContainer.classList.remove('loading-overlay');

        // chạy animation
        const items = gridContainer.querySelectorAll('.item-card');
        items.forEach((item, index) => {
            item.classList.remove('reload-animation');
            void item.offsetWidth; // Force reflow
            item.classList.add('reload-animation');

            // delay
            item.style.animationDelay = `${index * 0.04}s`;
        });
    }, 100);
});

// Event nhấn nút buy thêm vào localstorage

grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("item-buy-btn")) {
        const name = e.target.getAttribute("data-name");
        const selectedItem = grid_items.find(i => i.name === name);

        if (isLoged) {
            addToCart(selectedItem);
        } else {
            window.alert("Vui lòng đăng nhập");
            window.location.href = "pages/login/login.html";
        }
    }
});

function addToCart(product) {
    let currentUser = getCurrentUser();
    if (!currentUser) {
        alert("Vui lòng đăng nhập!");
        return;
    }

    if (!currentUser.cart) currentUser.cart = [];
    let cart = currentUser.cart;

    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            img: product.img,
            newPrice: Number(product.newPrice),
            oldPrice: Number(product.oldPrice),
            quantity: 1
        });
    }

    saveCurrentUser(currentUser);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// Filter Logic

const filterBtn = document.getElementById("filter-submit-btn");
const clearBtn = document.getElementById("clearCheckBoxBtn");

function applyFilter() {
    const checkedBoxes = document.querySelectorAll('.pop-checkbox input[type="checkbox"]:checked');

    // chuyển value thành mảng
    const selectedCategories = Array.from(checkedBoxes).map(cb => cb.value);

    // Nếu không chọn gì, hiện tất cả. Nếu có chọn, lọc theo type.
    if (selectedCategories.length === 0) {
        renderItems(grid_items);
    } else {
        const filteredData = grid_items.filter(item =>
            selectedCategories.includes(item.type)
        );
        renderItems(filteredData);
    }
}

filterBtn.addEventListener("click", applyFilter);

clearBtn.addEventListener("click", () => {
    const allBoxes = document.querySelectorAll('.pop-checkbox input[type="checkbox"]');
    allBoxes.forEach(cb => cb.checked = false);
    renderItems(grid_items);
});

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

// Logout Btn

const logOutBtn = document.querySelector("#logout-btn");
logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("loggedInId");
    isLoged = 0;
    setLoggedUI(isLoged);
})

// Cart Btn

const cartBtn = document.querySelector("#button-cart_img");
cartBtn.addEventListener('click', () => {
    window.location.href = "pages/cart/cart.html"
})
