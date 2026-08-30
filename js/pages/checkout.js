import { getUserCart } from "../storage/cartStorage.js";
import { getProductPriceNumber, getTotalCartPrice } from "../utils/formatPrice.js";
import { SHIPPING_RATES } from "../config/shippingRates.js";
import { clearCart } from "../storage/cartStorage.js";
import { saveLastOrder } from "../storage/orderStorage.js";
import { orderSummary } from "../components/orderSummary.js";

 

checkoutPage();
function checkoutPage() {
    const page = document.querySelector("#checkoutPage");
    const cart = getUserCart();

    page.innerHTML = /*HTML */`
     
        <form id="checkoutForm" class="checkout-form">
        <h1>Complete your order</h1>
            <div class="purchase-layout checkout">
                <div class="checkout-layout">
                    ${checkoutFormMarkup()}
                </div>
                <div class="payment-layout">
                     ${paymentMarkup()}
                  
                </div>
                <div class="order-summary-layout">
                     ${orderSummary(cart, true)}
                    
                    <button
                        type="submit"
                        class="btn primary-color complete-purchase"
                    >
                        Complete purchase
                    </button>
                </div>

            </div>
           
        
           
        </form>
    `;

   

    initShipping(cart);
    initPayment();
    initCheckoutSubmit();
}
function initShipping(cart) {
    const countrySelect = document.querySelector("#shipping-country");
    const postalCodeInput = document.querySelector("#postalCode");
    const shippingDisplay = document.querySelector("#shippingCost");
    const totalDisplay = document.querySelector("#totalCost");

    countrySelect.addEventListener("change", () => {
        const countryCode = countrySelect.value;

        if (countryCode === "NO") {
            postalCodeInput.setAttribute(
                "pattern",
                "[0-9]{4}"
            );

            postalCodeInput.setAttribute(
                "title",
                "Norsk postnummer må være nøyaktig 4 siffer"
            );
        } else {
            postalCodeInput.removeAttribute("pattern");
        }

        const shipping = getShippingCosts(countryCode);
        const subtotal = getTotalCartPrice(cart);
        const total = subtotal + shipping;

        shippingDisplay.textContent = shipping.toFixed(2);
        totalDisplay.textContent = total.toFixed(2);
    });
}

function initPayment() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    const cardPaymentDetails = document.querySelector("#card-payment-details");
    const paypalPaymentDetails = document.querySelector("#paypal-payment-details");
    const applePaymentDetails = document.querySelector("#apple-payment-details");
    const googlePaymentDetails = document.querySelector("#google-payment-details");



    paymentOptions.forEach((option) => {
        option.addEventListener("change", (event) => {
            const selectedPayment =
                event.currentTarget.value;
                emptyDetails();
            if (selectedPayment === "credit-card") {  
                cardPaymentDetails.innerHTML = cardPayment();
            }
            if (selectedPayment === "paypal") {    
                paypalPaymentDetails.innerHTML = paypalPayment();   
            }
            if (selectedPayment === "apple-pay") {   
                applePaymentDetails.innerHTML = applePayPayment();     
            }
            if (selectedPayment === "google-pay") {    
                googlePaymentDetails.innerHTML = googlePayPayment();    
            }
        });
    });
}
function emptyDetails(){
     const paymentDetails =
        document.querySelectorAll(".payment-details");
        paymentDetails.forEach((detail) => {
                detail.innerHTML = "";
        });         
}
function initCheckoutSubmit() {
    const form =  document.querySelector("#checkoutForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);

        const deliveryEmail = formData.get("emailAddress");
        const fullName = formData.get("fullName");
        const uniqueId = crypto.randomUUID();
 
        const lastOrder = {
            email: deliveryEmail,
            name: fullName,
            orderNumber: uniqueId
        };

        saveLastOrder(lastOrder);
        completePurchase();
    });
}
function cardPayment(){
    return/*HTML */` 
              
                    <div class="form-group">
                        <label for="cardNumber">Card Number:</label>
                    
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                             pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                            minlength="16"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <label for="expireDate">Expiration Date:</label>
                        <input
                            type="text"
                            id="expireDate"
                            name="expireDate"
                            pattern="(0[1-9]|1[0-2])/[0-9]{2}"
                            placeholder="MM/YY"
                            maxlength="5"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <label for="securityCode">CVC</label>
                        <input
                            type="text"
                            id="securityCode"
                            name="securityCode"
                            placeholder="CVC"
                            pattern="[0-9]{3}"
                            maxlength="3"
                            inputmode="numeric"
                            required
                            
                        >
                    </div>
                    <div class="form-group">
                        <label for="cardName">Cardholder Name</label>
                        <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            placeholder="Cardholder name"
                            minlength = "5";
                            required
                            
                        >
                    </div>
                `
}
function paypalPayment(){
    return /*HTML */`
        <div class="payment-info">
            <p>
                You will be redirected to PayPal
                to complete your payment.
            </p>

            <button 
                class="btn"
            type="button">
                Continue with PayPal
            </button>
        </div>
    `;
}
function applePayPayment() {
    return /*HTML */ `
        <div class="payment-info">
            <p>
                Pay securely with Apple Pay.
            </p>
        </div>
    `;
}
function googlePayPayment() {
    return  /*HTML */`
        <div class="payment-info">
            <p>
                Pay securely with Google Pay.
            </p>
        </div>
    `;
}

function checkoutFormMarkup(){
   return /*HTML */`
   
    <h2>Delivery information</h2>
    <div class="form-group">
        <label for="fullName">Full Name</label>
      
        <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            minlength="5"
            required
        >
    </div>
    <div class="form-group">
        <label for="emailAddress">Email address</label>
        <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            placeholder="Enter your email address"
            required
        >
    </div>
    <div class="form-group">
        <label for="phoneNumber">Phone number</label>
        <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="123 45 678"
            pattern="[0-9]{3} [0-9]{2} [0-9]{3}"
        >
    </div>
    <div class="form-group">
        <label for="streetAddress">Street address</label>
        <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            placeholder="Enter your street address"
            required
        >
    </div>
    <div class="form-group">
        <label for="postalCode">Postal code</label>
       
        <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal Code"
            required
        >
        <label for="city">City</label>
        <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            required
        >
    </div>
    <div class="form-group">
        <label for="shipping-country">Country</label>
        <select id="shipping-country" name="shipping-country" required>
            <option value="" disabled selected>Country</option>
            <option value="NO">Norge</option>
            <option value="SE">Sverige</option>
            <option value="DK">Danmark</option>
            <option value="FI">Finland</option>
            <option value="IS">Island</option>
            <option value="GB">Storbritannia</option>
            <option value="DE">Tyskland</option>
            <option value="NL">Nederland</option>
            <option value="FR">Frankrike</option>
            <option value="ES">Spania</option>
            <option value="IT">Italia</option>
            <option value="US">USA</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
        </select>
    </div>
   `;
}

function paymentMarkup(){
   return /*HTML */`
        <h2>Payment method <span class="small-info">Secure checkout</span></h2>
        <label class="payment-option">
            <input type="radio" name="payment" value="credit-card" required> 
            
            <span>Credit Card / Debit Card</span>
            <img src="../assets/icons/visa.png" alt="visa card">
            <img src="../assets/icons/mc.png" alt="master card">
        </label>

        <div id="card-payment-details" class="payment-details"> </div>

        <label class="payment-option">
            <input type="radio" name="payment" value="paypal"> 
            <span>PayPal</span>
            <img src="../assets/icons/paypal.png" alt="paypal icon">
        </label>

        <div id="paypal-payment-details" class="payment-details"> </div>

        <label class="payment-option">
            <input type="radio" name="payment" value="apple-pay"> 
            
            <span> Apple Payl</span>
           <img src="../assets/icons/apple-icon.png" alt="apple icon">
        </label>

        <div id="apple-payment-details" class="payment-details"> </div>
        
        <label class="payment-option">
            <input type="radio" name="payment" value="google-pay"> 
            <span> Google Payl</span>
            <img src="../assets/icons/google-icon.png" alt="google icon">
        </label>

        <div id="google-payment-details" class="payment-details"> </div>

        
    `;
}





function getShippingCosts(countryCode) {
    return SHIPPING_RATES[countryCode] ?? SHIPPING_RATES.DEFAULT;
}

function completePurchase(deliveryEmail){
    clearCart();
    location.href="../success/index.html";
    

}
