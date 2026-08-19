import { getUserCart } from "../storage/cartStorage.js";
import { getProductPrice } from "../utils/formatPrice.js";
import { 
    clearCart, 
    removeFromCart, 
    increaseItemInCart, 
    decreaseItemInCart 
} from "../storage/cartStorage.js";
import { updateCartCount } from "../utils/cartCount.js";


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

                    ${createCartView(cart)}
                
                    <a  id="clear-cart">
                        <img src="../assets/icons/trashcan_small.png"
                        alt="Clear cart"
                        >
                    </a>
                    <a href="../checkout/index.html"
                        class="btn primary-color">
                            Proceed to checkout   
                    </a>
                    
                <section>
        `;
    }
  

   const clearCartBtn = document.querySelector("#clear-cart");
    clearCartBtn.addEventListener("click", () =>{
        
        clearCart();
        cartPage();
        updateCartCount();
   });

   const clearProductFromCart = document.querySelectorAll('.clear-product');
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
            <a href="../index.html"
                class="btn primary-color">
                    Explore products
            </a>
            
        `; 
}

function createCartView(cart){
    let html = ''
    cart.forEach(element => {
        html += `
        <div>
            <img class="cart-image" src="${element.image.url}">
            <p>Title: ${element.title}</p>
            <p>Price: ${getProductPrice(element)}</p>
            <p>
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
            </p>
            <p>TotalPrice: ${getTotalPriceSingleProduct(element)}</p>
            
            <button class="clear-product"
                data-id="${element.id}"
            >
                <img src="../assets/icons/trashcan_small.png"
                    alt="Clear cart"
                >
            </button>
            
        </div>
        <hr>
        
        `
    });
    
    return html;
}

function getTotalPriceSingleProduct(product){
     const hasDiscount =
    product.discountedPrice < product.price;

    const price = hasDiscount  ? product.discountedPrice : product.price;
   
    let totalPriceSingleProduct = product.quantity * price;
    let oldPrice = product.quantity * product.price;
    const oldTotalPrice = hasDiscount ? oldPrice.toFixed(2) : '';

    return `<del>${oldTotalPrice}</del>` + ' '+ totalPriceSingleProduct.toFixed(2);
}