const cartListContainer = document.querySelector('#cartList');
const totalItem = document.querySelector('#total-items');
const totalPriceNew = document.querySelector('#total-price-new'); //giá giảm giá
const totalPriceOld = document.querySelector('#total-price-old'); //giá gốc
let productData = [];

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

// async function loadProduct (){
//    try{
//       const response = await fetch('data.json');
//       if (!response.ok) {
//             throw new Error('Không thể tải file JSON');
//         }
//         productData = await response.json(); // Gán dữ liệu vào biến
//         renderCart(); 
//    }
//    catch(error){
//       console.error("Lỗi:", error);
//         document.getElementById('cartList').innerHTML = "Không thể tải dữ liệu sản phẩm.";
//    }
// }

// Đổi logic fetch items

function loadProduct() {
   try {
      const currentUser = getCurrentUser();

      if (currentUser && currentUser.cart) {
         productData = currentUser.cart;
         renderCart();
      } else {
         document.getElementById('cartList').innerHTML = "Giỏ hàng của bạn đang trống.";
      }
   } catch (error) {
      console.error("Lỗi khi load giỏ hàng:", error);
      document.getElementById('cartList').innerHTML = "Có lỗi xảy ra khi tải giỏ hàng.";
   }
}

const PriceOld = () => {
    let sumPriceOld = 0;
    productData.forEach(p => {
        const price = Number(p.oldPrice || p.newPrice) || 0;
        const qty = Number(p.quantity) || 0;
        sumPriceOld += price * qty;
    });
    totalPriceOld.innerHTML = '$' + sumPriceOld.toFixed(2);
    return sumPriceOld;
}

const PriceNew = () => {
    let sumPriceNew = 0;
    productData.forEach((p) => {
        const price = Number(p.newPrice) || 0;
        const qty = Number(p.quantity) || 0;
        sumPriceNew += price * qty;
    });
    totalPriceNew.innerHTML = '$' + sumPriceNew.toFixed(2);
    return sumPriceNew;
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

const updatePayLoad = () => {
   PriceOld();
   PriceNew();
}


// const renderCart = () =>{

//    totalItem.innerHTML = productData.length;

//    let hmtlContent = "";
//    productData.forEach((product)=>{

//       hmtlContent+=`
//       <div class="container-item" >
//             <h4>${product.name}</h4>
//             <div class="cart-item" data-id="${product.id}">

//                 <img src="${product.image}" alt="${product.name}">
//                <div class="group__action__detail">  
//                 <div class="item-variants">
//                         <div class="variant">Size: <b>${product.size}</b></div>
//                 </div>

//                 <div class="item-actions">
//                         <div class="qty-control">
//                            <button onclick="decreateQty('${product.id}')">-</button>
//                            <input  id="qty-${product.id}" type="number" value="${product.qty}" readonly>
//                            <button onclick="increateQty('${product.id}')">+</button>
//                         </div>
//                 </div>

//                </div>     
//                 <div class="item-details">

//                     <div class="price">
//                             <span class="current">$${product.price.toFixed(2)}</span> 
//                             <span class="old">$${product.oldPrice.toFixed(2)}</span>
//                     </div>

//                     <div class="item-remove">
//                         <button class="btn-delete" onclick="removeItem('${product.id}')">
//                             <i class="fa-regular fa-trash-can"></i> Delete
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         `;
//    })

//    cartListContainer.innerHTML=hmtlContent;
//    updatePayLoad();
// }


const renderCart = () => {
    const totalQty = productData.reduce((sum, item) => sum + Number(item.quantity), 0);
    totalItem.innerHTML = totalQty;

    if (productData.length === 0) {
        cartListContainer.innerHTML = "<div class='empty-cart'>Giỏ hàng của bạn đang trống.</div>";
        updatePayLoad();
        return;
    }

    let htmlContent = "";
    productData.forEach((product) => {
        const imageSrc = product.img.startsWith('http') ? product.img : `/${product.img}`;

        htmlContent += `
        <div class="container-item">
            <h4>${product.name}</h4>
            <div class="cart-item">
                <img src="/assets/images/${imageSrc}" alt="${product.name}">
                <div class="group__action__detail">  
                    <div class="qty-control">
                        <button onclick="decreateQty('${product.name}')">-</button>
                        <input id="qty-${product.name}" type="number" value="${product.quantity}" readonly>
                        <button onclick="increateQty('${product.name}')">+</button>
                    </div>
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