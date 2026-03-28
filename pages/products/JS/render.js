import {filterProducts} from "./filter.js"
import {showProduct} from "./showPD.js"
import {paginate} from "./paginate.js"

//HÀM RENDER SẢN PHẨM 
export function render(allProducts  /*TẤT CẢ SẢN PHẨM*/, currentFilter /* PHÂN LOẠI SẢN PHẨM HIỆN TẠI */, 
  current_limit /* SỐ LƯƠNG SẢN PHẨM ĐƯỢC HIỂN THỊ */) {
  //GỌI HÀM ĐỂ CHỌN SẢN PHẨM ĐÚNG LOẠI
  let list_products_filtered = filterProducts(allProducts, currentFilter);

  //CẮT SẢN PHẨM THEO SỐ LƯỢNG ĐƯỢC HIỂN THỊ
  let paginated = paginate(list_products_filtered, current_limit);

  //SHOW SẢN PHẨM SAU KHI ĐÃ CẮT
  showProduct(paginated, list_products_filtered.length, currentFilter);
}

