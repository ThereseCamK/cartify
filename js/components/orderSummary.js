import { getProductPriceNumber, getTotalCartPrice } from "../utils/formatPrice.js";
export function orderSummary(cart, showItems = true) {
    let html = `
        <div class="order-summary">
            <h3>Order summary</h3>
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