import { getProductPriceNumber, getTotalCartPrice } from "../utils/formatPrice.js";
import { basePath } from "../utils/basePath.js";
export function orderSummary(cart, showItems = true) {
    let html = `
        <div class="order-summary">
            <h2>Order summary</h2>
    `;

    if (showItems) {
        html += `<ul class="order-summary-items">`;

        cart.forEach((item) => {
            html += `
                <li class="order-summary-item">
                    <img
                        class="cart-image"
                        src="${item.image.url}"
                        alt="${item.image.alt || item.title}"
                    >

                    <span class="order-sum-title">${item.title}</span>
                    <span class="qty-number">x${item.quantity}</span>
                    <span>
                        $${(
                            getProductPriceNumber(item) * item.quantity
                        ).toFixed(2)}
                    </span>
                </li>
                
            `;
        });
       

        html += /*HTML */`
               
                </ul>  
                <a class="edit-cart"
                    href="${basePath}/cart/index.html">
                        Edit cart
                </a>`;
    }

    html += `
        ${totalMarkup(cart)}
        </div>
    `;

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
                <p class="summary-price">$${subtotal.toFixed(2)}</p>
            </div>

            <div>
                <p>Shipping</p>
                <p class="summary-price">$<span id="shippingCost">${shipping.toFixed(2)}</span></p>
            </div>

            <div>
                <p>Total</p>
                <p class="summary-price">$<span id="totalCost">${total.toFixed(2)}</span></p>
            </div>
        </div>
    `;
}