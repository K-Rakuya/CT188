export function filterProducts(products, type) {
  if (type === "all") return products;

  return products.filter(p => p.category === type);
}
