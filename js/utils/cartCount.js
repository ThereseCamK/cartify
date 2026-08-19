import { getUserCart } from "../storage/cartStorage.js";
export function getCartItemCount() {
    const cart = getUserCart();
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });

    return count;
}

export function updateCartCount(){
    const cartCountElement = document.querySelector(".cart-count");

    if(!cartCountElement) return;

    cartCountElement.textContent = getCartItemCount();
}