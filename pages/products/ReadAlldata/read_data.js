import {filterProducts} from "../Filter_product/filter.js"
import {showProduct} from "../ShowProduct/showPD.js"
import {paginate} from "../Slice/Slice_products.js"

export let allProducts = [];
let currentFilter = "All";
let base_limit = 0;
let current_limit = 0;

let limit_mobile = 8;
let limit_tablet = 15;
let limit_laptop = 24;


function update_limit(){
  let current_width_window = window.innerWidth;
  if(current_width_window < 768){
    base_limit = limit_mobile;
  }
  else if(current_width_window < 1024){
   base_limit = limit_tablet;
  }
  else{
    base_limit = limit_laptop;
  }
  return base_limit;
}

let time;
window.addEventListener("resize", ()=>{
  clearTimeout(time);
  time = setTimeout(()=>{
    let oldBase = base_limit;
    update_limit();

    current_limit = Math.ceil(current_limit / oldBase) * base_limit;
    render();
  }, 500);
})

update_limit();
current_limit = base_limit;

function render() {
  let filtered = filterProducts(allProducts, currentFilter);
  let paginated = paginate(filtered, current_limit);
  showProduct(paginated, filtered.length, currentFilter);
}

// fetch data
Promise.all([
  fetch("Cafe/data_coffee.json").then(res => res.json()),
  fetch("Tea/data_tea.json").then(res => res.json()),
  fetch("Freeze/data_freeze.json").then(res => res.json())
])
.then(([coffee, tea, freeze]) => {
  allProducts = [...coffee, ...tea, ...freeze];
  render();
});


function choose_type(){
  const menu = document.querySelector(".sidebar ul");
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      update_limit();
      currentFilter = e.target.dataset.category;
      current_limit = base_limit;
      render();
    }
  });
}
choose_type();


function showMore(){
  const btn_show_more = document.querySelector(".button-show-pd");
  btn_show_more.addEventListener("click", ()=>{
    current_limit += base_limit;
    render();
  })
}
showMore();
