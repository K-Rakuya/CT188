import {filterProducts} from "../Filter_product/filter.js"
import {showProduct} from "../ShowProduct/showPD.js"
import {paginate} from "../Slice/Slice_products.js"

let allProducts = [];
let currentFilter = "all";
let limit = 0;
let limit_mobile = 8;
let limit_tablet = 15;
let limit_laptop = 24;

update_limit();
function update_limit(){
  let current_width_window = window.innerWidth;
  if(current_width_window < 768){
    limit = limit_mobile;
  }
  else if(current_width_window < 1024){
    limit = limit_tablet;
  }
  else{
    limit = limit_laptop;
  }
  return limit;
}

let time;
window.addEventListener("resize", ()=>{
  clearTimeout(time);
  time = setTimeout(()=>{
    update_limit();
    render();
  }, 500);
})

function render() {
  let filtered = filterProducts(allProducts, currentFilter);
  let paginated = paginate(filtered, limit);
  showProduct(paginated, filtered.length);
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
      render();
    }
  });
}
choose_type();


function showMore(){
  const btn_show_more = document.querySelector(".button-show-pd");
  btn_show_more.addEventListener("click", ()=>{
    let more = update_limit();
    limit += more;
    render();
  })
}
showMore();