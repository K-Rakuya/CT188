export function paginate(products, limit) {
  return products.slice(0, limit);
}