import { getUserCart } from "../storage/cartStorage.js";

import { 
    clearCart, 
    removeFromCart, 
    increaseItemInCart, 
    decreaseItemInCart 
} from "../storage/cartStorage.js";
import { updateCartCount } from "../utils/cartCount.js";
import { orderSummary } from "../components/orderSummary.js";
import { getCartItemCount } from "../utils/cartCount.js";
import { basePath } from "../utils/basePath.js";


cartPage();
function cartPage(){
  
   const page = document.querySelector("#cartPage");
    const cart = getUserCart();
   
    if(cart.length === 0) {
        page.innerHTML = emptyCartMarkup();
        return;
    }

    else{
        page.innerHTML = /*HTML*/`
                <section>
                <h1 class="cart-header">Your cart  (${getCartItemCount(cart)})</h1>
                    <div class="purchase-layout">
                        <div class="cart-items-layout">   
                            ${createCartView(cart)}
                        
                        
                            <button  class="trash-can-btn clear-all" id="clear-cart">
                                <img src="${basePath}/assets/icons/trashcan_red.png"
                                alt="Clear cart"
                                >Clear cart
                            </button>
                        </div>
                        <div class="order-summary-layout">
                            ${orderSummary(cart, false)}
                                <a href="${basePath}/checkout/index.html"
                                    class="btn primary-color cart-btn">
                                        Proceed to checkout   
                                </a>
                        </div>
                    </div>

                  
                </section>
        `;
    }
  

   const clearCartBtn = document.querySelector("#clear-cart");
    clearCartBtn.addEventListener("click", () =>{
        
        clearCart();
        cartPage();
        updateCartCount();
   });

   const clearProductFromCart = document.querySelectorAll('.cart-clear-product');
    clearProductFromCart.forEach((clearBtn) => {
    clearBtn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;

        removeFromCart(id);
        cartPage();
        updateCartCount();
        });
    });

    const increaseBtn = document.querySelectorAll(".increase-qty");
        increaseBtn.forEach((incBtn) => {
            incBtn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                increaseItemInCart(id);
                cartPage();
                updateCartCount();
        });
    });
     const decreaseBtn = document.querySelectorAll(".decrease-qty");
        decreaseBtn.forEach((incBtn) => {
            incBtn.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.id;
                decreaseItemInCart(id);
                cartPage();
                updateCartCount();
        });
    });
    
}

function emptyCartMarkup(){
    return /*HTML */`
            <h1>Your cart is feeling a little empty</h1>
            <p>Discover something you love and add it to your cart.</p>
            <a href="${basePath}/index.html#shop"
                class="btn primary-color">
                    Explore products
            </a>
            
        `; 
}

function createCartView(cart){
    let html = ''
    cart.forEach(element => {
        html += `
        <div class="cart-product">
            <img class="cart-image" src="${element.image.url}">
            <div class="cart-product-info">
                <p class="cart-product-title">${element.title}</p>
                
                <div class="increase-decrease-element">
                    <button
                    class="increase-qty "
                    data-id="${element.id}"  
                    >
                        +
                    </button >
                        ${element.quantity}
                    <button
                        class="decrease-qty "
                        data-id="${element.id}"
                    >
                    -
                    </button>
                </div>
                <p class="cart-product-price">${getTotalPriceSingleProduct(element)}</p>
            </div>
            
            
            <button  class="trash-can-btn cart-clear-product "
                data-id="${element.id}"
            >
                <img src="${basePath}/assets/icons/trashcan_red.png"
                    alt="Clear product in cart"
                >
            </button>
            
        </div>
        
        
        `
    });
    
    return html;
}

function getTotalPriceSingleProduct(product){
     const hasDiscount =
    product.discountedPrice < product.price;

    const price = hasDiscount  
        ? product.discountedPrice 
        : product.price;
    
    let totalPriceSingleProduct = product.quantity * price;
    let oldPrice = product.quantity * product.price;

    if(!hasDiscount){
        return /*HTML */`
            <span class="current-price">
                $${totalPriceSingleProduct.toFixed(2)}
            </span>
        `;
    }

    return /*HTML */`
     <span class="old-price">
            $${oldPrice.toFixed(2)}
        </span>

        <span class="new-price">
            $${totalPriceSingleProduct.toFixed(2)}
        </span>
    `;
}

