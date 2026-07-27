import { initAddToCart } from "../utils/initAddToCart.js";

 function createProductCard(product){
  
    return `
         <article class="product-card">
           
            <a href="./product/index.html?id=${product.id}">
             <img src="${product.image.url}" alt="${product.image.alt}">
             </a>
            <h3>${product.title}</h3>
            <p>${product.price}</p>
             <button 
                class="
                    feed-add-to-cart 
                    btn 
                    primary-color 
                    add-to-cart 
                    product-button"
                data-id=${product.id}
                >
                <span>Add to cart</span>
            </button>
        </article>
    `;
}


 export default function initCreateProductfeed(products){
      const productContainer = document.querySelector("#productFeed");
    productContainer.innerHTML = 
     `
        <section>
            <div class="product-feed-grid">
                ${products.map(createProductCard).join("")}
            </div>
          
        </section>
    `;
    initAddToCart(products, ".feed-add-to-cart")
}
    






