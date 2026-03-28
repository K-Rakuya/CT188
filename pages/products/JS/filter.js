//HÀM LỌC SẢN PHẨM THEO LOẠI
export function filterProducts(products, type) {
  if (type === "All") return products; //TRẢ VỀ TẤT CẢ SẢN PHẨM NẾU LOẠI LÀ ALL

  return products.filter(p => p.category === type);   //TRẢ VỀ SẢN PHẨM ĐÚNG LOẠI
}
