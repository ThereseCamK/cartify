
import { initAddToCart } from "../utils/initAddToCart.js";

let carouselProducts = [];

function createCarouselItem(product, index) {
  const activeClass = index === 1 ? "focused" : "";

  return `
    <article class="carousel-card ${activeClass}">
      <a href="./product/index.html?id=${product.id}">
        <img src="${product.image.url}" alt="${product.image.alt}">
       </a>
      <h3>${product.title}</h3>
      <p>${product.price}</p>

      <button 
          class="carousel-add-to-cart btn primary-color add-to-cart"
          data-id="${product.id}"
        >
          <span>Add to cart</span>
      </button>
   
    </article>
  `;
}

function createCarouselMarkUp(products) {
  return `
    <section class="carousel">
      <button
        id="carousel-back-btn"
        class="carousel-btn back-btn"
        type="button"
      >
        <img
          src="../assets/icons/arrow_backward.png"
          alt="Previous product"
        >
      </button>

      ${products
        .map((product, index) =>
          createCarouselItem(product, index)
        )
        .join("")}

      <button
        id="carousel-forward-btn"
        class="carousel-btn forw-btn"
        type="button"
      >
        <img
          src="../assets/icons/arrow_forrward.png"
          alt="Next product"
        >
      </button>
    </section>
  `;
}

export function initCarousel(products) {
  const carouselContainer = document.querySelector("#carousel");

  if(!carouselContainer || products.length === 0){
    return
  }
  carouselProducts = [...products];

  function renderCarousel() {
    carouselContainer.innerHTML = createCarouselMarkUp(carouselProducts);
 

    const backBtn = document.querySelector("#carousel-back-btn");
    const forwardBtn = document.querySelector(
      "#carousel-forward-btn"
    );

    backBtn.addEventListener("click", () => {
    let lastProduct = carouselProducts[carouselProducts.length -1];
      carouselProducts.pop();
      carouselProducts.unshift(lastProduct);
      renderCarousel();
    });

    forwardBtn.addEventListener("click", () => {
    let firstProduct = carouselProducts[0];
       carouselProducts.shift();
      carouselProducts.push(firstProduct);
      renderCarousel();
    });

  initAddToCart(carouselProducts, ".carousel-add-to-cart");

  }

  renderCarousel();
}



