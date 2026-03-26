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

// lấy dữ liệu JSON
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


const bannerItemContainer = document.getElementById("banner-item");

if (bannerItemContainer) {
    bannerItemContainer.addEventListener('click', (e) => {
        if (e.target && e.target.id === "banner-buy-btn") {
            const selectedItem = banner_items[bannerIndex];

            if (selectedItem) {
                addToCart(selectedItem);
                setTimeout(() => {
                    e.target.style.transform = "scale(1)";
                }, 100);
                // showToast("Lỗi: Logic chưa hoàn thiện!", "error");
            } else {
                showToast("Lỗi: Logic chưa hoàn thiện!", "error");
            }
        }
    });
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
                        <span class="before-sale">${item.oldPrice}đ</span>
                        <span class="after-sale">${item.newPrice}d</span>
                    </div>
                    <div class="flex gap-12" style="width: 85%;">
                        <button class="item-buy-btn btn-background radius-all-sm btn-shadow" style="font-weight: 600;" data-name="${item.name}">Buy</button>
                        <button class="more-btn btn-background radius-all-md btn-shadow" style="aspect-ratio: 1/1">⋯</button>
                    </div>
                </div>
            </div>`;
    });

    grid.innerHTML = htmlContent;
}


// Buy Button

grid.addEventListener("mouseover", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;
    if (btn.classList.contains("success-added")) return;
    if (auth.isLoged()) {
        btn.textContent = "Add to Cart";
    } else {
        btn.textContent = "Login / Register";
    }
}, true);

grid.addEventListener("mouseleave", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;
    if (btn.classList.contains("success-added") || btn.classList.contains("failed-add")) return;
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

const toolBarBtn = document.getElementById('menu');
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
        if (addToCart(selectedItem)) {
            e.target.textContent = "Added ✓";
            e.target.classList.add("success-added");
            e.target.style.background = "#38d75d";

            setTimeout(() => {
                e.target.classList.remove("success-added");
                e.target.style.background = "";
                e.target.textContent = "Buy";
            }, 1000);
        } else {
            e.target.textContent = "Failed ✓";
            e.target.classList.add("failed-add");
            e.target.style.background = "#38d75d";

            setTimeout(() => {
                e.target.classList.remove("failed-add");
                e.target.style.background = "";
                e.target.textContent = "Buy";
            }, 1000);
        }
    }
});

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

function addToCart(product) {
    let addSuccess = 0;
    let currentUser = getCurrentUser();

    if (!currentUser) {
        showToast("Vui lòng đăng nhập để mua hàng!", "error");
        return;
    }

    if (!currentUser.cart) currentUser.cart = [];
    let cart = currentUser.cart;

    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
        addSuccess = 1;
    } else {
        cart.push({
            name: product.name,
            img: product.img,
            newPrice: Number(product.newPrice),
            oldPrice: Number(product.oldPrice),
            quantity: 1
        });
        addSuccess = 1;
    }

    saveCurrentUser(currentUser);
    showToast(`Đã thêm <b>${product.name}</b> vào giỏ!`, "success");
    return addSuccess;
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
    if (avatarPreview) avatarPreview.src = "/assets/Avatar/avatar.png";
    location.reload();
})

// Cart Btn

const cartBtn = document.querySelector("#button-cart_img");
cartBtn.addEventListener('click', () => {
    window.location.href = "pages/cart/cart.html"
})


// Chi tiết sản phẩm khi nhấn vào item card

// hàm hiển tị
function showProductDetail(product) {
    let detailOverlay = document.getElementById('product-detail-overlay');

    if (!detailOverlay) {
        detailOverlay = document.createElement('div');
        detailOverlay.id = 'product-detail-overlay';
        document.body.appendChild(detailOverlay);
    }

    detailOverlay.innerHTML = `
        <div class="detail-card horizontal-glass">
            <button class="close-detail">&times;</button>
            <div class="detail-content flex-row">
                <div class="detail-img">
                    <img src="/assets/images/${product.img}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <span class="detail-type">${product.type}</span>
                    <h2>${product.name}</h2>
                    <p class="detail-desc">${product.Description}</p>
                    <div class="detail-pricing">
                        <span class="old">${product.oldPrice}đ</span>
                        <span class="new">${product.newPrice}đ</span>
                    </div>
                    <button class="add-to-cart-big" data-name="${product.name}">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    `;
    // sự kiện xuất hiện
    setTimeout(() => detailOverlay.classList.add('active'), 10);

    // Sự kiện đóng
    detailOverlay.querySelector('.close-detail').onclick = () => {
        detailOverlay.classList.remove('active');
    };
    detailOverlay.onclick = (e) => {
        if (e.target === detailOverlay) detailOverlay.classList.remove('active');
    };

    // Sự kiện mua hàng
    const bigBuyBtn = detailOverlay.querySelector('.add-to-cart-big');
    bigBuyBtn.onclick = () => {
        addToCart(product);
        const originalText = bigBuyBtn.textContent;
        bigBuyBtn.textContent = "Đã thêm vào giỏ ✓";
        bigBuyBtn.style.background = "#28a745";

        setTimeout(() => {
            bigBuyBtn.textContent = originalText;
            bigBuyBtn.style.background = "";
        }, 1500);
    };
}

// Gắn sự kiện Click vào Grid
grid.addEventListener('click', (e) => {
    const card = e.target.closest('.item-card');
    const buyBtn = e.target.closest('.item-buy-btn');

    if (card && !buyBtn) {
        const productName = card.querySelector('h3').innerText;
        // Tìm dữ liệu sản phẩm từ mảng grid_items
        const product = grid_items.find(item => item.name === productName);
        if (product) showProductDetail(product);
    }
});

// Avatar logic

document.addEventListener('DOMContentLoaded', () => {
    const avatarPreview = document.querySelector("#avatar-wrapper img"); 
    let currentUser = getCurrentUser();
    if (currentUser && currentUser.avatar && avatarPreview) {
        avatarPreview.src = currentUser.avatar;
    }
});

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