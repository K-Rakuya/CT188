export function create_control_Slider(Slider){
  const slider_window = document.querySelector(".slider-window");
  const product_card = Slider.querySelector(".product-card");
  const btn_prev = document.querySelector(".btn-prev");
  const btn_next = document.querySelector(".btn-next");
  if(product_card == null) {
    return;
  }
  let width_of_card = product_card.offsetWidth;
  function updateWidth(){
    width_of_card = product_card.offsetWidth;
  }
  updateWidth();
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
  return Slider;
}

export function control_button_order(Slider){
  const btn_order = Slider.querySelectorAll(".order-btn");
  const content = btn_order[0].textContent;
  if(btn_order.length == 0){
    return;
  }
  for(let i = 0; i<btn_order.length; i++){
    btn_order[i].addEventListener("mouseenter", ()=>{
      btn_order[i].textContent = "Register";
    })
    btn_order[i].addEventListener("mouseleave", ()=>{
      btn_order[i].textContent = content;
    })
  }

}