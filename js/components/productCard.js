 function createProductCard(product){
  
    return `
         <article class="product-card">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
        </article>
    `
}


export default function createProductfeed(products){
  
    return `
        <section class="carousel">
            ${products.map(createProductCard).join("")}
        </section>
    `;
}

