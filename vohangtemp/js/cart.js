const cartListContainer = document.querySelector('#cartList');
const totalItem = document.querySelector('#total-items');
const totalPrice =document.querySelector('#total-Price');
const priceOld = document.querySelector('#Price-oder');
let productData = [];

async function loadProduct (){
   try{
      const response = await fetch('data.json');
      if (!response.ok) {
            throw new Error('Không thể tải file JSON');
        }
        productData = await response.json(); // Gán dữ liệu vào biến
        renderCart(); 
   }
   catch(error){
      console.error("Lỗi:", error);
        document.getElementById('cartList').innerHTML = "Không thể tải dữ liệu sản phẩm.";
   }
}

const renderCart = () =>{
   
   totalItem.innerHTML = productData.length;

   priceOld.innerHTML = '$'+updatePriceOld();

   totalPrice.innerHTML = '$'+updatePrice();

   let hmtlContent = "";
   productData.forEach((product)=>{
      
      hmtlContent+=`
      <div class="container-item" >
            <h4>${product.name}</h4>
            <div class="cart-item" data-id="${product.id}">
            
                <img src="${product.image}" alt="${product.name}">
               <div class="group__action__detail">  
                <div class="item-variants">
                        <div class="variant">Size: <b>${product.size}</b></div>
                </div>
               
                <div class="item-actions">
                        <div class="qty-control">
                           <button onclick="decreateQty('${product.id}')">-</button>
                           <input type="number" value="${product.qty}" readonly>
                           <button onclick="increateQty('${product.id}')">+</button>
                        </div>
                </div>

               </div>     
                <div class="item-details">
                        
                    <div class="price">
                            <span class="current">$${product.price.toFixed(2)}</span> 
                            <span class="old">$${product.oldPrice.toFixed(2)}</span>
                    </div>

                    <div class="item-remove">
                        <button class="btn-delete" onclick="removeItem('${product.id}')">
                            <i class="fa-regular fa-trash-can"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
   })

   cartListContainer.innerHTML=hmtlContent;
   
}

const updatePriceOld=()=>{
   let totalPriceOld = 0;
   productData.forEach(p=>{
      totalPriceOld+=p.oldPrice;
   })
   return totalPriceOld;
}

const updatePrice = () =>{
   let sumPrice = 0;
   productData.forEach((product)=>{
      sumPrice+=product.price * product.qty;
   })
   return sumPrice;
}

function removeItem(id) {
   productData = productData.filter(p=>p.id!==id);
   renderCart();
}

const updateSummary = ()=>{
   let bagTotal = 0 ;

   productData.forEach(p =>{
      bagTotal+=p.price*p.qty;
   })

}

function decreateQty(id){
   let product = productData.find(p => p.id === id);
   if(product && product.qty > 1){
      product.qty--;
      renderCart();
   }
}

function increateQty(id){
   let product = productData.find(p => p.id === id);
   if(product){
      product.qty++;
      renderCart();
   }
}

loadProduct();


