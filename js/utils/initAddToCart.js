import { handleAddToCart } from "../services/handleAddToCart.js";
export function initAddToCart(products, selector) {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.id;

            const product = products.find(
                product => product.id === id
            );

            if (!product) return;

            handleAddToCart(product);
        });
    });
}