
import { handleToggleWishlist } from "../services/handleWishlist.js";

export function initToggleWishlist(products, selector){
    const toggleWishlistIcon = document.querySelectorAll(selector);

    toggleWishlistIcon.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.id;
           
            const product = products.find(
                p => p.id === id
            );

            if(!product) return;

            const updatedWishlist = handleToggleWishlist(product);
             if (!updatedWishlist) {
                return;
            }

            const isWishlisted = updatedWishlist.includes(product.id);
            
             const matchingElements = document.querySelectorAll(
                `${selector}[data-id="${product.id}"]`
            );

            matchingElements.forEach((element) => {
                element.classList.toggle(
                    "wishlisted",
                    isWishlisted
                );
            });
        });
    });
}