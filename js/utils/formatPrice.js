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