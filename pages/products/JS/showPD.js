import {add_Event_order_btn} from "./order.js"
//HÀM HIỂN THỊ SẢN PHẨM

export function showProduct(products, number_of_all_products, type_of_product) {
    //TRUYỀN VÀO 3 THAM SỐ BAO GỒM:
    //DANH SÁCH SẢN PHẨM
    //SỐ LƯỢNG SẢN PHẨM
    //LOẠI CỦA SẢN PHẨM
    const list_all_products = document.querySelector(".product-grid");  
    let btn_show_more = document.querySelector(".button-show-pd");
    
    if(products.length < number_of_all_products){
        btn_show_more.style.display = "initial";    
        //HIỆN NÚT NẾU LƯỢNG SẢN PHẨM VƯỢT QUÁ SỐ LƯỢNG TỐI ĐA HIỂN THỊ
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
    //GẮN CÁC SẢN PHẨM VÀO PRODUCT GRID

    list_all_products.innerHTML = html;
    add_Event_order_btn(list_all_products);
    //TRUYỀN VÀO HÀM PRODUCT GRID SAU KHI RENDER


    const parent_grid = list_all_products.parentElement;
    let title = parent_grid.querySelector(".title-product");


    //LOGIC ĐỂ HIỂN THỊ LOẠI CỦA SẢN PHẨM TRÊN TITLE
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

//HÀM HIỂN THỊ SẢN PHẨM (DÙNG CHO LOGIC TÌM KIẾM SẢN PHẨM)
export function showProductNeed(list_product){
    if(list_product.length===0){
        showProduct(list_product, list_product.length, "");
    }
    else{
        showProduct(list_product, list_product.length, "Kết Quả Tìm Kiếm");
    }
}


