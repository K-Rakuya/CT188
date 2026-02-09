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

let x = 0, y = 0;
let currentX = 0, currentY = 0;

const banner = document.getElementById("main-banner-wrapper");

document.addEventListener("mousemove", (e) => {
    x = (e.clientX / window.innerWidth - 0.5) * 20;
    y = (e.clientY / window.innerHeight - 0.5) * 20;
})

function animate() {
    currentX += (x - currentX) * 0.01;
    currentY += (y - currentY) * 0.01;
    banner.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
    requestAnimationFrame(animate);
}
animate();


// Grid Items


const grid = document.getElementById("main-grid-items")

var items = [];

fetch("/assets/data/items.json")
    .then(res => res.json())
    .then(data => {
        items = data;
        renderItems(items);
    })
    .catch(err => console.error(err));

function renderItems(item) {
    grid.innerHTML = "";

    items.forEach(item => {
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

            '<button class="item-buy-btn flex-center btn-background radius-all-xs btn-shadow">Buy</button>' +

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



