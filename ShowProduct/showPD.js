function getVisible(){
    let current_width = window.innerWidth;
    if(current_width < 768){
        return 6;
    } 
    if(current_width < 1024){
        return 9;
    }
    return 16;
}

let current_visible_more = 0;

export function ShowProduct(products_grid){
    const container_product = products_grid.parentElement;
    let btn_show = container_product.querySelector(".button-show-pd");

    function getList(){
        return products_grid.querySelectorAll(".product-card");
    }

    function update(){
        let list_products = getList();
        let product_card_visible = getVisible() + current_visible_more;

        if(list_products.length > product_card_visible){
            btn_show.style.display = "initial";
        }else{
            btn_show.style.display = "none";
        }
    }

    function init(){
        let list_products = getList();

        // Ẩn hết
        list_products.forEach(item => {
            item.style.opacity = "0";
            item.style.pointerEvents = "none";
        });


        // Hiện lần đầu
        let step = getVisible() + current_visible_more;
        for(let i = 0; i < step && i < list_products.length; i++){
            list_products[i].style.opacity = "1";
            list_products[i].style.pointerEvents = "auto";
        }

        update();
    }

    function showMore(){
        let list_products = getList();

        let start = getVisible() + current_visible_more;
        let step = getVisible();

        for(let i = start; i < start + step && i < list_products.length; i++){
            list_products[i].style.opacity = "1";
            list_products[i].style.pointerEvents = "auto";
        }

        current_visible_more += step;
    }

    btn_show.addEventListener("click", ()=>{
        showMore();
        products_grid.style.maxHeight = products_grid.scrollHeight + "px";
        update();
    });

    let id_time;
    window.addEventListener("resize", ()=>{
        clearTimeout(id_time);
        id_time = setTimeout(init, 200);
    });

    init();
}
