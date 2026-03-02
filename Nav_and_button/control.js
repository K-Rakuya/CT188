import { isLogged} from "../control_register/checkLogin.js";

export function create_control_Slider(Slider){
  const slider_window = Slider.parentElement;
  const container = slider_window.parentElement;
  const product_card = Slider.querySelector(".product-card");
  const btn_prev = container.querySelector(".btn-prev");
  const btn_next = container.querySelector(".btn-next");
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


export function control_button_order(Slider) {
  const btn_order = Slider.querySelectorAll(".order-btn");
  if(btn_order.length == 0){
    return;
  }
  btn_order.forEach(btn => {
    const originalText = btn.textContent;

    btn.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1024 && !isLogged()) {
        btn.textContent = "Register/Login";
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 1024 && !isLogged()) {
        btn.textContent = originalText;
      }
    });

    if(isLogged()){
      btn.addEventListener("click", ()=>{
        
      })
    }
    else{
      btn.addEventListener("click", ()=>{
        window.location.href = "control_register/test_reg.html";
      })
    }
  })
}