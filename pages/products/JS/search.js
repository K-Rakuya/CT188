//HÀM BỎ DẤU 1 CHUỖI (BỎ DẤU KHI NGƯỜI DÙNG TÌM SẢN PHẨM)
function removeVietnameseTones(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//HÀM TÌM SẢN PHẨM, TRUYỀN VÀO DANH SÁCH TẤT CẢ SẢN PHẨM VÀ TỪ KHÓA CỦA NGƯỜI DÙNG
export function searchProducts(products, keyword) {
  let key = removeVietnameseTones(keyword);
  key = key.toLowerCase().trim().replace(/\s+/g, " ");
  //CẮT KHOẢNG TRỐNG THỪA, BỎ DẤU

  //LỌC SẢN PHẨM THEO TỪ KHÓA ĐÃ TÌM KIẾM
  return products.filter(product => {
    let name = removeVietnameseTones(product.name).toLowerCase();
    let category = removeVietnameseTones(product.category).toLowerCase();
    return (
      name.includes(key) ||
      category.includes(key)
    );
  });
  //TRẢ VỀ 1 DANH SÁCH SẢN PHẨM NGƯỜI DÙNG CẦN
}

//HÀM LẤY TÊN SẢN PHẨM TỪ NGƯỜI DÙNG
export function getNameFromSearch(){
  const input = document.querySelector("#search-product");
  return input.value;
}

