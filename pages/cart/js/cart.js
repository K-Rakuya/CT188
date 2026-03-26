const cartListContainer = document.querySelector('#cartList');
const totalItem = document.querySelector('#total-items');
const totalPriceNew = document.querySelector('#total-price-new'); //giá giảm giá
const totalPriceOld = document.querySelector('#total-price-old'); //giá gốc
const emptyMsg = document.querySelector(".cart-empty"); 
const content = document.querySelector(".content");

let productData = [];

let currentCouponValue = 0; 

// --- QUAN TRỌNG: Đưa hàm tính toán lên đầu để các hàm khác gọi được ---

const calculateSavings = () => {
    let totalSavings = 0;

    productData.forEach(p => {
        // Lấy giá gốc, nếu không có thì lấy giá mới (để tránh lỗi undefined)
        const old = Number(p.oldPrice) || Number(p.newPrice) || 0;
        const current = Number(p.newPrice) || 0;
        const qty = Number(p.quantity) || 0;

        // Tiết kiệm từ giá gốc của sản phẩm
        if (old > current) {
            totalSavings += (old - current) * qty;
        }
    });

    // CỘNG THÊM tiền từ mã giảm giá đã áp (biến currentCouponValue toàn cục)
    totalSavings += currentCouponValue;

    const savedElement = document.querySelector("#discount-sale");
    if (savedElement) {
        // Hiển thị ngay và luôn
        savedElement.innerHTML = `$${totalSavings.toFixed(2)}`;
    }
    return totalSavings;
};

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

const PriceNew = () => {
    let sumPriceNew = 0;
    productData.forEach((p) => {
        sumPriceNew += (Number(p.newPrice) || 0) * (Number(p.quantity) || 0);
    });
    
    // Giá cuối cùng khách trả = Tổng giá mới - Coupon
    let finalPay = sumPriceNew - currentCouponValue;
    
    if (totalPriceNew) totalPriceNew.innerHTML = '$' + finalPay.toFixed(2);
    
    return finalPay; 
};

// Hàm tổng để cập nhật mọi con số
const updatePayLoad = () => {
    PriceOld();      
    PriceNew();      
    calculateSavings(); // Tính toán và hiển thị tiết kiệm ngay tại đây
};

// --- Xử lý sự kiện Coupon ---
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
        
        updatePayLoad(); // Cập nhật lại toàn bộ giá và tiết kiệm
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

// Gọi cập nhật lần đầu khi load trang
updatePayLoad();

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



// Sync localstorage

const syncWithLocalStorage = () => {
   const currentUser = getCurrentUser();
   if (currentUser) {
      currentUser.cart = productData;
      saveCurrentUser(currentUser);
   }
   updatePayLoad();
}

const renderCart = () => {
    const totalQty = productData.reduce((sum, item) => sum + item.quantity, 0);
    totalItem.innerHTML = totalQty;

    if (productData.length === 0) {
        emptyMsg.classList.remove("hide"); 
        content.classList.add("hide");
        cartListContainer.innerHTML = ""; 
        return; 
    } else {
        emptyMsg.classList.add("hide");
        content.classList.remove("hide");
    }

    let htmlContent = "";
    productData.forEach((product) => {
        const imageSrc = product.img.startsWith('http') 
            ? product.img 
            : `/assets/images/${product.img.replace(/^\//, '')}`;

        htmlContent += `
        <div class="container-item">
            <div class="cart-item">
                <img src="${imageSrc}" alt="${product.name}">
                <div class="item-main">
                    <h4>${product.name}</h4>
                    <div class="qty-control">
                        <button onclick="decreateQty('${product.name}')">-</button>
                        <input id="qty-${product.name}" type="number" value="${product.quantity}" readonly>
                        <button onclick="increateQty('${product.name}')">+</button>
                    </div>
                    <div class="item-details">
                        <div class="price">
                            <span class="current">$${Number(product.newPrice).toFixed(2)}</span> 
                            <span class="old">$${Number(product.oldPrice || product.newPrice).toFixed(2)}</span>
                        </div>
                        <div class="item-remove">
                            <button class="btn-delete" onclick="removeItem('${product.name}')">
                                <i class="fa-regular fa-trash-can"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    cartListContainer.innerHTML = htmlContent;
    updatePayLoad();
}



// function removeItem(id) {
//    productData = productData.filter(p=>p.id!==id);
//    renderCart();
// }

function removeItem(name) {
    productData = productData.filter(p => p.name !== name);
    syncWithLocalStorage();
    renderCart();
}

// function decreateQty(id){
//    let product = productData.find(p => p.id === id);
//    if(product && product.qty > 1){
//       product.qty--;
//       document.getElementById(`qty-${id}`).value = product.qty;
//       updatePayLoad();
//    }
// }

function decreateQty(name) {
    let product = productData.find(p => p.name === name);
    if (product && product.quantity > 1) {
        product.quantity--;
        syncWithLocalStorage();
        renderCart();
    }
}

// function increateQty(id){
//    let product = productData.find(p => p.id === id);
//    if(product){
//       product.qty++;
//       document.getElementById(`qty-${id}`).value = product.qty;
//       updatePayLoad();
//    }
// }

function increateQty(name) {
    let product = productData.find(p => p.name === name);
    if (product) {
        product.quantity++;
        syncWithLocalStorage();
        renderCart();
    }
}

loadProduct();


document.getElementById('btn-place').addEventListener('click', () => {
    if (productData.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }
    
    alert("Đặt hàng thành công! Cảm ơn bạn.");
    
    // Xóa giỏ hàng của user hiện tại
    const currentUser = getCurrentUser();
    if (currentUser) {
        currentUser.cart = [];
        saveCurrentUser(currentUser);
        location.reload(); 
    }
});

