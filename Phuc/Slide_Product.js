const btn_prev = document.querySelector(".btn-prev");
const btn_next = document.querySelector(".btn-next");
const product_card = document.querySelectorAll(".product-card");
const slider_track = document.querySelector(".slider-track");
console.log(product_card.length)


function update_width(){
    width_of_card = product_card[0].offsetWidth;
    return width_of_card;
}
let current_width = update_width();

window.addEventListener("resize", ()=>{
    current_width = update_width();
});

btn_next.addEventListener("click", () =>{
    slider_track.style.transform = `translateX(-${current_width}px)`;
});
