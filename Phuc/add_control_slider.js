export function create_control_Slider(Slider){
  const slider_window = document.querySelector(".slider-window");
  const product_card = Slider.querySelectorAll(".product-card-cafe");
  const btn_prev = document.querySelector(".btn-prev");
  const btn_next = document.querySelector(".btn-next");
  if(product_card.length == 0) {
    return;
  }
  let width_of_card = product_card[0].offsetWidth;
  function updateWidth(){
    width_of_card = product_card[0].offsetWidth;
  }

  window.addEventListener("resize", updateWidth);

  btn_next.addEventListener("click", () => {
    slider_window.scrollBy({
      left: width_of_card,
      behavior: "smooth"
    });
  });

  btn_prev.addEventListener("click", () => {
    slider_window.scrollBy({
      left: -width_of_card,
      behavior: "smooth"
    });
  });
}