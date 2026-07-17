function createCarouselItem(product){
    return `
        <article class="carousel-card">
            <img src="${product.image.url}" alt="${product.image.alt}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
        </article>
    `;
}

export default function createCarousel(products){
    
    return `
        <section class="carousel">
            ${products.map(createCarouselItem).join("")}
        </section>
    `;

 
}