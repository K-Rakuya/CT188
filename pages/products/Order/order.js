import { isLoggedIn } from "../CheckUser/isLogged.js";

let currentProduct = null;

export function add_Event_order_btn(product_grid) {
    const orderForm = document.querySelector("#order-form");
    if (!product_grid || !orderForm) return;

    product_grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".btn-order, .item-buy-btn");
        if (!btn) return;

        e.preventDefault();
        if (!isLoggedIn()) return window.location.href = "/pages/login/login.html";

        const card = btn.closest(".item-card, .product-card");
        currentProduct = {
            name: card.querySelector("h3, .pd-name").textContent.trim(),
            img: card.querySelector("img").getAttribute("src").replace("/assets/images/", ""),
            newPrice: card.querySelector(".after-sale, .price").textContent.replace(/[^0-9.]/g, ""),
            oldPrice: card.querySelector(".before-sale")?.textContent.replace(/[^0-9.]/g, "") || 0
        };
        orderForm.classList.add("toggle");
        const containerImg = orderForm.querySelector(".img-order-form");
        if (containerImg) containerImg.innerHTML = `<img src="/assets/images/${currentProduct.img}" style="max-width: 100px; border-radius: 8px;">`;
    });
    orderForm.onsubmit = (e) => {
        e.preventDefault();
        const qty = parseInt(new FormData(orderForm).get("quantity")) || 1;

        if (addToCart(currentProduct, qty)) {
            orderForm.classList.remove("toggle");
            orderForm.reset();
        }
    };
}

// --- QUẢN LÝ USER & GIỎ HÀNG 

const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

function addToCart(product, quantityToAdd = 1) {
    const loggedInId = localStorage.getItem('loggedInId');
    const users = getStorage('users');
    const user = users.find(u => u.id === loggedInId);

    if (!user) {
        if (window.showToast) showToast("Vui lòng đăng nhập!", "error");
        return false;
    }

    if (!user.cart) user.cart = [];
    const existing = user.cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity += quantityToAdd;
    } else {
        user.cart.push({ ...product, 
            newPrice: Number(product.newPrice), 
            oldPrice: Number(product.oldPrice), 
            quantity: quantityToAdd 
        });
    }

    localStorage.setItem('users', JSON.stringify(users));
    
    if (window.showToast) showToast(`Đã thêm <b>${product.name}</b>`, "success");
    else alert("Đã thêm vào giỏ hàng!");
    
    return true;
}