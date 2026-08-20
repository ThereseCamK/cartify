import {initCarousel}  from "../components/carousel.js"
import { getAllProducts } from "../api.js";
import initCreateProductfeed  from "../components/productCard.js";
import  filterByCategory  from "../utils/filteredProducts.js";
import { allowedTags, categories} from "../config/categories.js";

initHome();
async function initHome() {
  
  const carouselContainer = document.querySelector("#carousel");
  const productContainer = document.querySelector("#productFeed");

  carouselContainer.innerHTML = "<p>Loading products...</p>";
  productContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const products = await getAllProducts();

    const allProducts = filterByCategory(products, "all");
    const featuredProducts = allProducts.slice(0, 3);

    initCarousel(featuredProducts);
    createCategorySelect(products);
    initSearch(products);

    if (window.location.hash === "#shop") {
    const productFeed = document.querySelector("#shop");

    productFeed.scrollIntoView({
        behavior: "smooth"
    });
}
   
  } catch (error) {
    console.error(error);

    const errorMessage = `
      <div class="error-message">
        <h2>Something went wrong</h2>
        <p>We could not load the products. Please try again later.</p>
      </div>
    `;

    carouselContainer.innerHTML = errorMessage;
    productContainer.innerHTML = errorMessage;
  }
}


function createCategorySelect(products) {
  const categoriesContainer = document.querySelector("#categorySelect");

  let activeCategory = "all";

  const categoryBar = `
   <p>Filter by category</p>
    <div class="categoryBar">
        <button id="all" class="categoryToken" data-category="all">All</button>
        <button id="fashion" class="categoryToken" data-category="fashion">Fashion</button>
        <button id="beauty" class="categoryToken" data-category="beauty">Beauty</button>
        <button id="watches" class="categoryToken" data-category="watches">Watches</button>
        <button id="headphones" class="categoryToken" data-category="headphones">Headphones</button>
    </div>
   
  `;

  categoriesContainer.innerHTML = categoryBar;

  const categoryButtons =
    categoriesContainer.querySelectorAll(".categoryToken");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      activeCategory = event.currentTarget.dataset.category;

      createFeed(products, activeCategory);
    });
  });

  createFeed(products, activeCategory);
}

function createFeed(products, activeCategory){
   
    const filteredProducts = filterByCategory(products, activeCategory);

    initCreateProductfeed(filteredProducts);
 
}

function initSearch(products){
    const searchInput = document.querySelector("#searchInput");
        if (!searchInput) {
        return;
    }

      searchInput.addEventListener("input", (event) => {
      const searchValue = event.currentTarget.value.toLowerCase().trim();
   
      const filteredResults = products.filter(product => {
        return product.title.toLowerCase().includes(searchValue);
      });
      createFeed(filteredResults, "all")
    })
}


