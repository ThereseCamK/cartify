import carousel from "../components/carousel.js";
import { getAllProducts } from "../api.js";
import createProductfeed from "../components/productCard.js";
import  filterByCategory  from "../utils/filteredProducts.js";
import { allowedTags, categories} from "../config/categories.js";


createCarousel();
async function createCarousel(){
    
    
    let products = await getAllProducts();
    const carouselContainer = document.querySelector("#carousel");
    const allProducts = filterByCategory(products, "all")
    const featuredProducts = allProducts.slice(0,3);

    carouselContainer.innerHTML = carousel(featuredProducts);
    createCategorySelect(products);
}



function createCategorySelect(products) {
  const categoriesContainer = document.querySelector("#categorySelect");

  let activeCategory = "all";

  const categoryBar = `
    <button id="all" class="categoryToken" data-category="all">All</button>
    <button id="fashion" class="categoryToken" data-category="fashion">Fashion</button>
    <button id="beauty" class="categoryToken" data-category="beauty">Beauty</button>
    <button id="watches" class="categoryToken" data-category="watches">Watches</button>
    <button id="headphones" class="categoryToken" data-category="headphones">Headphones</button>
  `;

  categoriesContainer.innerHTML = categoryBar;

  const categoryButtons =
    categoriesContainer.querySelectorAll(".categoryToken");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      activeCategory = event.currentTarget.dataset.category;

      createfeed(products, activeCategory);
    });
  });

  createfeed(products, activeCategory);
}

function createfeed(products, activeCategory){
  
    const productContainer = document.querySelector("#productFeed");
    
    const filteredProducts = filterByCategory(products, activeCategory);

    productContainer.innerHTML = createProductfeed(filteredProducts);

}
