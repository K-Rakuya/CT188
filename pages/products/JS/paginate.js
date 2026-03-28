//HÀM CẮT SẢN PHẨM CẦN HIỂN THỊ
export function paginate(products, limit) {
  return products.slice(0, limit);
}