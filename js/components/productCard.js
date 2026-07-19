 function createProductCard(product){
  
    return `
         <article class="product-card">
           
            <a href="./product/index.html?id=${product.id}">
             <img src="${product.image.url}" alt="${product.image.alt}">
             </a>
            <h3>${product.title}</h3>
            <p>${product.price}</p>
             <button class="btn primary-color add-to-cart product-button">
                <span>Add to cart</span>
            </button>
        </article>
    `
}


export default function createProductfeed(products){
  
    return `
        <section>
            <div class="product-feed-grid">
                ${products.map(createProductCard).join("")}
            </div>
          
        </section>
    `;
}

