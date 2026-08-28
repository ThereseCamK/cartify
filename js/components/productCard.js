import { initAddToCart } from "../utils/initAddToCart.js";
import { getUserWishlist } from "../storage/wishListStorage.js";
import { initToggleWishlist } from "../utils/initToggleWishlist.js";
import { createModal } from "./modal.js";
import { getProductPrice } from "../utils/formatPrice.js";

 function createProductCard(product){
    const wishlist = getUserWishlist();
   
    let inUsersWishlist = "";
    if(wishlist.includes(product.id)){
        inUsersWishlist = "wishlisted";
    }
    
    return /*HTML */`
         <article class="product-card">
          <div class="wishlist-toast-container"></div>
           <a 
                class="toggleWishlist ${inUsersWishlist} wishlistIcon"
                data-id=${product.id}>
                
           </a>
            <a href="./product/index.html?id=${product.id}">
                <img src="${product.image.url}" alt="${product.image.alt}">
             </a>
            <h3>${product.title}</h3>
            <p>${getProductPrice(product)}</p>
           
             <button 
                class="
                    feed-add-to-cart 
                    btn 
                    primary-color 
                    product-button"
                data-id=${product.id}
                >
                <span>Add to cart</span>
            </button>
        </article>
        ${createModal("errorModal", 
        "Log in to add items",
        `You need to be logged
        in before you can add 
        product to your wishlist or cart.`,
        `
         <a href="../account/login.html">
                    <button 
                    class="btn primary-color">
                        Log in
                    </button>
                </a>
                <a href="../account/register.html">
                    <button 
                    class="btn ">
                        Create account
                    </button>
                </a>
                <br>
                 <button class="modal-close">
                 Maybe Later
                 </button>
        `)}
    `;
}


 export default function initCreateProductfeed(products){
      const productContainer = document.querySelector("#productFeed");
    productContainer.innerHTML = 
     `
        <section>
            <div class="product-feed-grid">
                ${products.map(createProductCard).join("")}
            </div>
          
        </section>
    `;
    initAddToCart(products, ".feed-add-to-cart");

    initToggleWishlist(products, ".toggleWishlist");


    

}
    






