export function getProductPrice(product){
   const hasDiscount =
    product.discountedPrice < product.price;

  if (!hasDiscount) {
    return `
      <span class="current-price">
        $${product.price.toFixed(2)}
      </span>
    `;
  }

  return `
    <span class="old-price">
      $${product.price.toFixed(2)}
    </span>

    <span class="new-price">
      $${product.discountedPrice.toFixed(2)}
    </span>
  `;
}

export function getProductPriceNumber(product){
     return product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;
}
export function getTotalCartPrice(cart){
    let total = 0;
    cart.forEach(item=> {
        const price = getProductPriceNumber(item);
        total += price * item.quantity;
        });
    return total;
}
