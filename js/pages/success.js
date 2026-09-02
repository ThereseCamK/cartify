import { getLastOrder, clearLastOrder } from "../storage/orderStorage.js";
import { basePath } from "../utils/basePath.js";
successPage();
function successPage(){
   const lastOrder = getLastOrder();
   
    const successContent = document.querySelector("#successPage");
   if(!lastOrder){
         successContent.innerHTML = /*HTML*/ `
        <section class="confirmation-page">
            <h1> No recent order found</h1>
            <a href="${basePath}/index.html#shop" 
                class="btn primary-color">
                    Continue to shopping
            </a>
        </section> 
    `; 
    return;
   }
    successContent.innerHTML = /*HTML*/ `
        <section class="confirmation-page">
            <div class="confirm-circle">
                <div class="check-mark">✔</div>
            </div>
            <div class="confirmation-info">
                <div class="confirmation-header">
                    <h1>Order placed!</h1>
                    <p>Thank you for your purchase </p>
                    <h2>${lastOrder.name}.</h2>
                    <p>Your order has been received.</p>
                </div>
                <div class="order-confirmation-wrapper">
                        
                    <p class="order-label">Order number</p>
                    <p>${lastOrder.orderNumber}</p>
                    <p class="order-label">Order date </p>
                    <p>${new Date().toDateString()}</p>
                </div>

                <p>Your confirmation is associated with: <span class="order-mail">${lastOrder.email}</span> </P>

                <a href="${basePath}/index.html#carousel" 
                    class="btn primary-color">
                        Continue shopping
                </a>
            </div>
        </section> 
    `;

    clearLastOrder();
}



