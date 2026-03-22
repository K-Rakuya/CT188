export function filterProducts(productGrid) {
    const buttons = document.querySelectorAll(".filter-product");

    buttons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const category = this.dataset.category;

            const products = productGrid.children;

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const productCategory = product.dataset.category;

                if (category === productCategory) {
                    product.style.display = "flex";
                } else {
                    product.style.display = "none";
                }
            }
        });
    });
}