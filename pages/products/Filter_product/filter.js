export function filterProducts(products, type) {
  if (type === "All") return products;

  return products.filter(p => p.category === type);
}
