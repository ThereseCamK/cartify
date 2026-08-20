import { getUserCart } from "../storage/cartStorage.js";
import { getProductPriceNumber, getTotalCartPrice } from "../utils/formatPrice.js";
import { SHIPPING_RATES } from "../config/shippingRates.js";
import { clearCart } from "../storage/cartStorage.js";
import { saveLastOrder } from "../storage/orderStorage.js";

 

checkoutPage();
function checkoutPage() {
    const page = document.querySelector("#checkoutPage");
    const cart = getUserCart();

    page.innerHTML = `
        <form id="checkoutForm">
            ${checkoutFormMarkup()}
            ${paymentMarkup()}
            ${orderSummary(cart)}

            <a href="..index.html#shop">Continue shopping</a>
            <hr>

            ${totalMarkup(cart)}

            <button
                type="submit"
                class="btn primary-color completePurchase"
            >
                Complete purchase
            </button>
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

    const paymentDetails = document.querySelector("#paymentDetails");

    paymentOptions.forEach((option) => {
        option.addEventListener("change", (event) => {
            const selectedPayment =
                event.currentTarget.value;

            if (selectedPayment === "credit-card") {
                paymentDetails.innerHTML = cardPayment();
            }

            if (selectedPayment === "paypal") {
                paymentDetails.innerHTML = paypalPayment();
            }

            if (selectedPayment === "apple-pay") {
                paymentDetails.innerHTML = applePayPayment();
            }

            if (selectedPayment === "google-pay") {
                paymentDetails.innerHTML = googlePayPayment();
            }
        });
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

            <button type="button">
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
    <p>Delivery information</p>
   
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
        <p>Payment method <span>Secure checkout</span></p>
        <label>
            <input type="radio" name="payment" value="credit-card" required> 
            Credit Card / Debit Card
        </label>
        <label>
            <input type="radio" name="payment" value="paypal"> 
            PayPal
        </label>
        <label>
            <input type="radio" name="payment" value="apple-pay"> 
            Apple Pay
        </label>
        <label>
            <input type="radio" name="payment" value="google-pay"> 
            Google Pay
        </label>

        <div id="paymentDetails"> </div>
    `;
}

function orderSummary(cart) {
    
    let html = `<ul class="order-summary">`;

    cart.forEach((item) => {
        html += `
            <li class="order-summary-item">
                <img
                    class="cart-image"
                    src="${item.image.url}"
                    alt="${item.image.alt || item.title}"
                >

                <span>${item.title}</span>
                <span>x ${item.quantity}</span>
                <span>
                    $${(
                        getProductPriceNumber(item) * item.quantity
                    ).toFixed(2)}
                </span>
            </li>
        `;
    });

    html += `</ul>`;

    return html;
}

function totalMarkup(cart) {
    const subtotal = getTotalCartPrice(cart);
    const shipping = 0;
    const total = subtotal + shipping;

    return `
        <div class="checkout-total">
            <div>
                <p>Subtotal</p>
                <p>$${subtotal.toFixed(2)}</p>
            </div>

            <div>
                <p>Shipping</p>
                <p>$<span id="shippingCost">${shipping.toFixed(2)}</span></p>
            </div>

            <div>
                <p>Total</p>
                <p>$<span id="totalCost">${total.toFixed(2)}</span></p>
            </div>
        </div>
    `;
}


function getShippingCosts(countryCode) {
    return SHIPPING_RATES[countryCode] ?? SHIPPING_RATES.DEFAULT;
}

function completePurchase(deliveryEmail){
    clearCart();
    location.href="../success/index.html";
    

}
