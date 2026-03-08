const burger_btn = document.querySelector('.burger-menu');
const features_list = document.querySelector('.features-list');


window.addEventListener("resize", () => {
  const menu = document.querySelector(".features-list");

  if (window.innerWidth >= 768) {
    menu.classList.remove("active");
  }
});

burger_btn.addEventListener('click', () => {
    let check  = features_list.classList.toggle('active');
    if(check){
        features_list.style.transform = 'translateX(0)';
    }
    else{
        features_list.style.transform = 'translateX(-100%)';
    }
})