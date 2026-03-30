
const cartListContainer = document.querySelector('#cartList');
const totalItem = document.querySelector('#total-items');
const totalPriceNew = document.querySelector('#total-price-new'); // Giá sau giảm
const totalPriceOld = document.querySelector('#total-price-old'); // Giá gốc chưa giảm
const emptyMsg = document.querySelector(".cart-empty"); 
const content = document.querySelector(".content");

let productData = [];       // Mảng chứa các sản phẩm trong giỏ hàng
let currentCouponValue = 0; // Giá trị mã giảm giá đang áp dụng (mặc định là 0)


// Hàm tính tổng số tiền tiết kiệm (Giảm giá sản phẩm + Coupon)
const calculateSavings = () => {
    let totalSavings = 0;

    productData.forEach(p => {
        // Nếu không có giá cũ, coi như bằng giá mới (không giảm)
        const old = Number(p.oldPrice) || Number(p.newPrice) || 0;
        const current = Number(p.newPrice) || 0;
        const qty = Number(p.quantity) || 0;

        // Tiết kiệm từ chênh lệch giá niêm yết
        if (old > current) {
            totalSavings += (old - current) * qty;
        }
    });

    // Cộng thêm tiền từ mã giảm giá đã áp dụng
    totalSavings += currentCouponValue;

    const savedElement = document.querySelector("#discount-sale");
    if (savedElement) {
        savedElement.innerHTML = `$${totalSavings.toFixed(2)}`;
    }
    return totalSavings;
};

// Hàm tính tổng giá gốc của toàn bộ sản phẩm
const PriceOld = () => {
    let sumPriceOld = 0;
    productData.forEach(p => {
        const price = Number(p.oldPrice) || Number(p.newPrice) || 0;
        const qty = Number(p.quantity) || 0;
        sumPriceOld += price * qty;
    });
    if (totalPriceOld) totalPriceOld.innerHTML = '$' + sumPriceOld.toFixed(2);
    return sumPriceOld;
};

// Hàm tính tổng số tiền khách phải trả (Đã trừ Coupon)
const PriceNew = () => {
    let sumPriceNew = 0;
    productData.forEach((p) => {
        sumPriceNew += (Number(p.newPrice) || 0) * (Number(p.quantity) || 0);
    });
    
    // Giá cuối cùng = Tổng tiền sản phẩm - Tiền Coupon
    let finalPay = sumPriceNew - currentCouponValue;
    
    // Đảm bảo giá không bị âm nếu coupon lớn hơn giá trị đơn hàng
    if (finalPay < 0) finalPay = 0;

    if (totalPriceNew) totalPriceNew.innerHTML = '$' + finalPay.toFixed(2);
    
    return finalPay; 
};

// Hàm tổng hợp để cập nhật toàn bộ thông số trên màn hình thanh toán
const updatePayLoad = () => {
    PriceOld();      
    PriceNew();      
    calculateSavings(); 
};

/*QUẢN LÝ DỮ LIỆU NGƯỜI DÙNG VÀ LOCALSTORAGE 
 */

function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getCurrentUser() {
    const users = getAllUsers();
    const loggedInId = localStorage.getItem('loggedInId');
    return loggedInId ? users.find(user => user.id === loggedInId) : null;
}

function saveCurrentUser(updatedUser) {
    let users = getAllUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
        users[index] = updatedUser;
    } else {
        users.push(updatedUser);
    }
    localStorage.setItem('users', JSON.stringify(users));
}

// Hàm đồng bộ dữ liệu productData vào LocalStorage của User
const syncWithLocalStorage = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
        currentUser.cart = productData;
        saveCurrentUser(currentUser);
    }
    updatePayLoad(); // Cập nhật lại tiền ngay sau khi đồng bộ
}

//RENDER GIAO DIỆN GIỎ HÀNG 

function loadProduct() {
    try {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.cart && currentUser.cart.length > 0) {
            productData = currentUser.cart;
            renderCart();
        } else {
            productData = [];
            emptyMsg.classList.remove("hide"); 
            content.classList.add("hide");
            renderCart();
        }
    } catch (error) {
        console.error("Lỗi khi load giỏ hàng:", error);
    }
}

const renderCart = () => {
    // Tổng số lượng các dòng sản phẩm
    totalItem.innerHTML = productData.length;

    if (productData.length === 0) {
        emptyMsg.classList.remove("hide"); 
        content.classList.add("hide");
    } else {
        emptyMsg.classList.add("hide");
        content.classList.remove("hide");
    }

    let htmlContent = "";
    productData.forEach((product) => {
        const imageSrc = product.img.startsWith('http') ? product.img : `/${product.img}`;
        htmlContent += `
        <article class="cart-item">
            <img src="/assets/images/${imageSrc}" alt="${product.name}">
            <div class="item-main">
                <h4>${product.name}</h4>
                <div class="qty-control">
                    <button onclick="decreateQty('${product.id}')">-</button>
                    <input id="qty-${product.id}" type="number" value="${product.quantity}" readonly>
                    <button onclick="increateQty('${product.id}')">+</button>
                </div>
                <div class="item-details">
                    <div class="price">
                        <span class="current">$${Number(product.newPrice).toFixed(2)}</span> 
                        <span class="old">$${Number(product.oldPrice || product.newPrice).toFixed(2)}</span>
                    </div>
                    <div class="item-remove">
                        <button class="btn-delete" onclick="removeItem('${product.id}')">
                            <i class="fa-regular fa-trash-can"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </article>`;
    });

    cartListContainer.innerHTML = htmlContent;
    updatePayLoad();
}



// Xóa sản phẩm khỏi giỏ hàng
function removeItem(id) {
        productData = productData.filter(p => p.id !== id);
        syncWithLocalStorage();
        renderCart();
}

// Giảm số lượng sản phẩm
function decreateQty(id) {
    let product = productData.find(p => p.id === id);
    if (product && product.quantity > 1) {
        product.quantity--;
        syncWithLocalStorage();
        renderCart();
    }
}

// Tăng số lượng sản phẩm
function increateQty(id) {
    let product = productData.find(p => p.id === id);
    if (product) {
        product.quantity++;
        syncWithLocalStorage();
        renderCart();
    }
}

//XỬ LÝ MÃ GIẢM GIÁ VÀ ĐẶT HÀNG 

document.getElementById('apply-coupon').addEventListener('click', () => {
    const codeInput = document.getElementById('coupon-code');
    const code = codeInput.value.trim().toUpperCase();
    const msg = document.querySelector('.coupon-msg');
    
    msg.classList.add('show');
    
    if (code === "GIAMGIA10" || code === "GIAMGIA20") {
        currentCouponValue = (code === "GIAMGIA10") ? 10 : 20;
        
        msg.textContent = `Áp dụng thành công! -$${currentCouponValue}`;
        msg.className = "coupon-msg show success";
        
        codeInput.classList.add('input-success');
        codeInput.classList.remove('input-error');
        
        updatePayLoad(); 
    } else {
        currentCouponValue = 0;
        updatePayLoad();
        
        msg.textContent = "Mã không hợp lệ.";
        msg.className = "coupon-msg show error";
        codeInput.classList.add('input-error');
        codeInput.classList.remove('input-success');

        setTimeout(() => {
            msg.classList.remove('show');
        }, 2000); 
    }
});

document.getElementById('btn-place').addEventListener('click', () => {
    if (productData.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }
    
    alert("Đặt hàng thành công! Cảm ơn bạn.");
    
    const currentUser = getCurrentUser();
    if (currentUser) {
        currentUser.cart = [];
        saveCurrentUser(currentUser);
        location.reload(); 
    }
});

// Khởi chạy
loadProduct();