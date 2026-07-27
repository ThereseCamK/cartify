import { getUserCart } from "../storage/cartStorage.js";
import { getProductPrice } from "../utils/formatPrice.js";
import { clearCart } from "../storage/cartStorage.js";

cartPage();
function cartPage(){
   const page = document.querySelector("#cartPage");
    const cart = getUserCart();

   page.innerHTML = /*HTML*/`
        <section>

            ${createCartView(cart)}
            <button
                id="clear-cart"
            >clear cart</button>
        <section>
   `;

   const clearCartBtn = document.querySelector("#clear-cart");
   clearCartBtn.addEventListener("click", () =>{
    console.log("denne funker")
    clearCart();
    cartPage()
   })
}

function createCartView(cart){
    let html = ''
    cart.forEach(element => {
        html += `
        <div>
            <img class="cart-image" src="${element.image.url}">
            <p>Title: ${element.title}</p>
            <p>Price: ${getProductPrice(element)}</p>
            <p><button>+</button>${element.quantity}<button>-</button></p>
            <p>TotalPrice: ${getTotalPriceSingleProduct(element)}</p>
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