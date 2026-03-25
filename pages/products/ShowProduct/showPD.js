import {add_Event_order_btn} from "../Order/order.js"
export function showProduct(products, number_of_all_products, type_of_product) {
    const list_all_products = document.querySelector(".product-grid");  
    let btn_show_more = document.querySelector(".button-show-pd");
    
    if(products.length < number_of_all_products){
        btn_show_more.style.display = "initial";   
    }
    else{
        btn_show_more.style.display = "none";   
    }
    let html = ``;

    products.forEach(p => {
        html += `
        <article id="${p.id}" class="product-card" data-category="${p.category}">
            <div class="container-img">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="info-product">
                <h4 class="pd-name">${p.name}</h4>
                <p class="price">${p.price.toLocaleString("vi-VN")} VNĐ</p>
            </div>
            <button class="btn-order">Thêm vào giỏ</button>
        </article>
        `;
    });

    list_all_products.innerHTML = html;
    add_Event_order_btn(list_all_products);
    const parent_grid = list_all_products.parentElement;
    let title = parent_grid.querySelector(".title-product");
    if(products.length > 0){
        if(type_of_product === "All"){
            title.querySelector("h2").innerText = "Tất cả sản phẩm";
        }
        else{
            title.querySelector("h2").innerText = type_of_product;
        }
    }
    else{
        title.querySelector("h2").innerText = "Không có sản phẩm";
    }
}

export function showProductNeed(list_product){
    const list_all_products = document.querySelector(".product-grid"); 
    if(list_product.length===0){
        showProduct(list_product, list_product.length, "");
    }
    else{
        showProduct(list_product, list_product.length, "Kết Quả Tìm Kiếm");
    }
}


