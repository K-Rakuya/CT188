
const buttons_prev = document.querySelector(".btn-prev");
const buttons_next = document.querySelector(".btn-next");
const list_cafe = document.querySelectorAll(".product-card-cafe");

const width_card = list_cafe[0].offsetWidth;

let index = 0;

function slide_next() {
    const slides = document.querySelector(".slider-track");
    index++;
    slides.style.transform = `translateX(-${index * width_card}px)`;
}

function slide_prev() {
    const slides = document.querySelector(".slider-track");
    if (index > 0) index--;
    slides.style.transform = `translateX(-${index * width_card}px)`;
}

buttons_next.onclick = slide_next;
buttons_prev.onclick = slide_prev;


