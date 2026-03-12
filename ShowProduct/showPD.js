export function getListOfCards(pd_grid){
    let List_of_Cards = pd_grid.querySelectorAll(".product-card");
    return List_of_Cards;
}




// article class="product-card coffee-card">
//         <div class="container-img"><img src="${p.image}" alt="${p.name}"></div>
//         <div class="info-product">
//             <h4>${p.name}</h4>
//             <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
//         </div>
//         <button class="btn-order">Thêm vào giỏ</button>
//       </article>