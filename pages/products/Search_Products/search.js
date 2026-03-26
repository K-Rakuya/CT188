import {allProducts} from "../ReadAlldata/read_data.js"
import {showProductNeed} from "../ShowProduct/showPD.js"

function removeVietnameseTones(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function searchProducts(products, keyword) {
  let key = removeVietnameseTones(keyword);
  key = key.toLowerCase().trim().replace(/\s+/g, " ");

  return products.filter(product => {
    let name = removeVietnameseTones(product.name).toLowerCase();
    let category = removeVietnameseTones(product.category).toLowerCase();
    return (
      name.includes(key) ||
      category.includes(key)
    );
  });
}

function getNameFromSearch(){
  const input = document.querySelector("#search-product");
  let key = input.value;
  let result = searchProducts(allProducts, key);
  showProductNeed(result);
}

const inputFromUser = document.querySelector("#search-product");

inputFromUser.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getNameFromSearch();
    }
});