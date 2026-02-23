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

// Animate Banner

// Parallax

const banner_item = document.getElementById("banner-item");

let x = 0;
let y = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 20;
    y = (e.clientY / window.innerHeight - 0.5) * 20;
});

function animate() {
    currentX += (x - currentX) * 0.01;
    currentY += (y - currentY) * 0.01;

    banner_item.style.transform = "translate(" + currentX + "px, " + currentY + "px) scale(1.05)";

    requestAnimationFrame(animate);
}

animate();

// Slide banner

const banner = document.querySelector("#main-banner-wrapper > img");

const banner_images = [
    "/assets/Banners/banner1.jpg",
    "/assets/Banners/banner2.jpg",
    "/assets/Banners/banner3.jpg"
];

let bannerStartX = 0;
let bannerIsDrag = false;
let bannerIndex = 0;
let bannerOffset = 0;

banner.addEventListener("mousedown", (e) => {
    bannerIsDrag = true;
    bannerStartX = e.clientX;
    banner.style.transition = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!bannerIsDrag) return;

    let diff = e.clientX - bannerStartX;
    diff = Math.max(-900, Math.min(900, diff))
    bannerOffset = diff * (0.03);


    banner.style.transform = 'translateX(' + bannerOffset + 'px)';
});

document.addEventListener("mouseup", () => {
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

    // fade ảnh cũ

    banner.style.transition = "opacity 0.3s ease";
    banner.style.opacity = "0";
    setTimeout(() => {
        change_banner_item(bannerIndex);
    }, 100);

    setTimeout(() => {
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
});

const banner_items_img = [
    "/assets/Banners/items/item1.png",
    "/assets/Banners/items/item2.png",
    "/assets/Banners/items/item3.png"
]

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

    }, 300);
}

// Add banner item

banner_item.innerHTML =
    '<img src="/assets/Banners/items/item1.png" alt="">' +
    '<div><h1>Ten</h1><p>Thong tin 1</p></div>' + 
    '<button id="banner-buy-btn">Buy Now!</button>'


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
    grid.innerHTML = "";

    grid_items.forEach(item => {
        grid.innerHTML +=
            '<div class="item-card flyIn radius-auto liquid-background card-backdrop card-border gap-2">' +
            '<div class="item-wrapper flex-center flex-col gap-2">' +

            '<div class="item-banner img-crop radius-auto img-shadow">' +
            '<img src="/assets/images/' + item.img + '">' +
            '</div>' +

            '<h3>' + item.name + '</h3>' +

            '<div class="relative flex gap-4 price">' +
            '<span class="before-sale">' + item.oldPrice + '$</span>' +
            '<span class="after-sale">' + item.newPrice + '$</span>' +
            '</div>' +

            '<div class="flex gap-12" style="width: 85%"><button class="item-buy-btn flex-center btn-background radius-all-sm btn-shadow">Buy</button><button class="btn-background radius-all-md btn-shadow" style="width: 15%; aspect-ratio: 1/1">⋯</button></div>' +

            '</div>' +
            '</div>';
    })
}


// Buy Button

grid.addEventListener("mouseover", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;

    if (auth.isLoged()) {
        btn.textContent = "Click to Add to Cart";
    } else {
        btn.textContent = "Login / Register First";
    }
}, true);

grid.addEventListener("mouseleave", e => {
    const btn = e.target.closest(".item-buy-btn");
    if (!btn) return;

    btn.textContent = "Buy";
}, true);



