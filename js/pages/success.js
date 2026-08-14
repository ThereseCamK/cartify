import { getLastOrder } from "../storage/orderStorage.js";
successPage();
function successPage(){
   const lastOrder = getLastOrder();
   
    const successContent = document.querySelector("#successPage");
   
    successContent.innerHTML = /*HTML*/ `
        <section class="confirmation-page">
            <div class="confirm-circle">
                <div class="check-mark">✔</div>
            </div>
            <h1>Order placed!</h1>
            <p>Thank you for your purchase </p>
            <h2>${lastOrder.name}.</h2>
            <p>Your order has beed recived.</p>

            <div class="order-confirmation-wrapper">
                    
                <p>Order number</p>
                <p>${lastOrder.orderNumber}</p>
                <p>Order date </p>
                <p>${new Date().toDateString()}</p>
            </div>

            <p>We've sent a confirmation email to ${lastOrder.email} </P>

            <a href="../index.html"><button class="btn primary-color">Continue shopping</button></a>
        </section> 
    `;
}



