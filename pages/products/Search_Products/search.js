import {allProducts} from "../ReadAlldata/read_data.js"
import {showProductNeed} from "../ShowProduct/showPD.js"
function searchProducts(products, keyword) {
  let key = keyword.toLowerCase().trim().replace(/\s+/g, " ");

  return products.filter(product => {
    return (
      product.name.toLowerCase().includes(key) ||
      product.category.toLowerCase().includes(key)
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