import { getUserCart } from "../storage/cartStorage.js";
import { getProductPrice } from "../utils/formatPrice.js";


checkoutPage();
function checkoutPage(){
    const page = document.querySelector('#checkoutPage');
    const cart = getUserCart();

    page.innerHTML = /*HTML */`
       
        ${checkoutFormMarkup()}
        
        ${paymentMarkup()}

        ${orderSummary(cart)}
        <a href="../cart/index.html">Edit cart</a>
        <hr>

        ${totalMarkup(cart)}
    `;
}

function checkoutFormMarkup(){
   return /*HTML */`
    <p>Delivery information</p>
        <form>
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                >
            </div>
            <div class="form-group">
                <label for="emailAddress">Email address</label>
                <input
                    type="text"
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
                    type="number"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Enter code"
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
                <label for="country">Country</label>
                <select id="shipping-country" name="shipping-country">
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
        </form>

   `;
}

function paymentMarkup(){
    return /*HTML */`
        <p>Payment method <span>Secure checkout</span></p>
        <form >
            <label>
                <input 
                    type="radio" 
                    name="payment" 
                    value="credit-card" 
                    > 
                    Credit Card / Debit Card
            </label>
            <label>
                <input 
                    type="radio" 
                    name="payment" 
                    value="paypal"
                    > 
                    PayPal
            </label>
            <label>
                <input 
                    type="radio" 
                    name="payment" 
                    value="apple-pay"
                    > 
                    Apple Pay
            </label>
            <label>
                <input 
                    type="radio" 
                    name="payment" 
                    value="google-pay"
                    > 
                    Google Pay
            </label>
        </form>
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
    const shipping = getShippingCosts();
    const total = subtotal + shipping;

    return `
        <div class="checkout-total">
            <div>
                <p>Subtotal</p>
                <p>$${subtotal.toFixed(2)}</p>
            </div>

            <div>
                <p>Shipping</p>
                <p>$${shipping.toFixed(2)}</p>
            </div>

            <div>
                <p>Total</p>
                <p>$${total.toFixed(2)}</p>
            </div>
        </div>
    `;
}

function getTotalCartPrice(cart){
    let total = 0;
    cart.forEach(item=> {
        const price = getProductPriceNumber(item);
        total += price * item.quantity;
        });
    return total;
}

function getShippingCosts(){
    //its selected by the country, but its 1 for now
    return 1;
}
function getProductPriceNumber(product){
     return product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
}