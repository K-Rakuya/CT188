function getVisible(){
    let current_width = window.innerWidth;
    if(current_width < 768){
        return 2;
    } 
    if(current_width < 1024){
        return 6;
    }
    return 8;
}

export function ShowProduct(proucts_grid){
    const container_product = proucts_grid.parentElement;
    let btn_show = container_product.querySelector(".button-show-pd");

    function update(){
        let product_card_visible = getVisible();
        let number_products = proucts_grid.querySelectorAll(".product-card").length;
        if(number_products > product_card_visible){
            btn_show.style.display = "initial";
        }else{
            btn_show.style.display = "none";
        }
    }

    btn_show.addEventListener("click", ()=>{
        let check = proucts_grid.classList.toggle("collapsed");
        if(check == false){
            btn_show.innerHTML = '<span class="arrow">▲</span>'
        }
        else{
            btn_show.innerHTML = '<span class="arrow">▼</span>';
        }
    })

    let id_time;
    window.addEventListener("resize", ()=>{
        clearTimeout(id_time);
        id_time = setTimeout(update, 200);
    })
    update();
}

