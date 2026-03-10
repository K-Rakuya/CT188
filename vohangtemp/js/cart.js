const cartListContainer = document.querySelector('#cartList');
const totalItem = document.querySelector('#total-items');
const totalPriceNew =document.querySelector('#total-price-new'); //giá giảm giá
const totalPriceOld = document.querySelector('#total-price-old'); //giá gốc
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


const PriceOld=()=>{
   let sumPriceOld = 0;
   productData.forEach(p=>{
      sumPriceOld+=p.oldPrice*p.qty;
   })
    totalPriceOld.innerHTML = '$'+sumPriceOld.toFixed(2);

   return sumPriceOld;
}

const PriceNew = () =>{
   let sumPriceNew = 0;
   productData.forEach((product)=>{
      sumPriceNew+=product.price * product.qty;
   })
   totalPriceNew.innerHTML = '$'+sumPriceNew;
   return sumPriceNew;
}

const updatePayLoad = () =>{
   PriceOld();
   PriceNew();
}


const renderCart = () =>{
   
   totalItem.innerHTML = productData.length;
   
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
                           <input  id="qty-${product.id}" type="number" value="${product.qty}" readonly>
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
   updatePayLoad();
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
      document.getElementById(`qty-${id}`).value = product.qty;
      updatePayLoad();
   }
}

function increateQty(id){
   let product = productData.find(p => p.id === id);
   if(product){
      product.qty++;
      document.getElementById(`qty-${id}`).value = product.qty;
      updatePayLoad();
   }
}

loadProduct();


