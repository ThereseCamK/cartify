import { getProductById } from "../api.js";

initProductPage();
async function initProductPage(){
    const productPagecontainer = document.querySelector("#productPage");
  
   

   
    
    
    productPagecontainer.innerHTML = `
    <p class="loading-message">Loading product...</p>`;

    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id'); 

        if(!id){
            throw new Error("Product Id is missing");
        }
        const product = await getProductById(id);

        productPagecontainer.innerHTML = createProductPageMargup(product);
        initShareButton(product);
        // initAddToCart(product);
        
    }
    catch (error){
        console.error(error);

        productPagecontainer.innerHTML = `¨
            <section class="error-message">
                <h1>Product not found</h1>
                <p>We could not load this product.</p>
                <a href="../index.html">Return to home</a>
            </section>
        `
    }

  

}

function createProductPageMargup(product){
    console.log(product)
    return `
        <nav class="breadcrumb">
            <a href="../index.html" >Home</a>
            <span class="separator">|</span>
            <a class="current"> ${product.tags[0]}</a>
            <span class="separator">|</span>
            <a class="current"> ${product.title}</a>
        </nav>
    
        <section class="singleProductCard">
            <img 
                src="${product.image.url}" 
                alt="${product.image.alt || product.title}"
            >
            <div class="product-information">
                <p class="card-title">
                    ${product.title}
                </p> 

            
                <p class="review-stars">
                    ${getReviewStars(product)}
                </p>

                <p class="product-description">
                    ${product.description}
                </p>

                  <p class="product-tags">
                    ${product.tags.join(' ')}
                </p>

                <p class="product-price">
                    ${getProductPrice(product)}
                </p>

                 <button 
                    class="btn primary-color add-to-cart"
                    data-product-id="${product.id}"
                 >
                    <span>Add to cart</span>
                </button>

                <button 
                    id="shareButton" 
                    class="icon-button" 
                    aria-label="Share product"
                >
                    <img src="../assets/icons/small_share_black.png" alt="shareProduct">
                </button>
            </div>
            
        </section>
    `;

 
}

function getReviewStars(product){

    const reviews = product.reviews || [];

    if(reviews.length === 0){
        return `
        <div class="review-stars">
            <span>No reviews yet</span>
        </div>
        `;
    }

    const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
    );

    const averageRating = totalRating /reviews.length;
    const roundedRating = Math.round(averageRating);

    const filledStars = "★".repeat(roundedRating);
    const emptyStars = "☆".repeat(5 - roundedRating);

    return `
        <div class="review-stars">
            <span
                class="stars"
                aria-label="${averageRating.toFixed(1)} out of 5 stars"
            >
            ${filledStars}${emptyStars}
            </span>

            <span class="review-count">
                Reviews (${reviews.length})
            </span>
        </div>
    `;
   
}

function getProductPrice(product){
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

function initShareButton(product){
   const shareButton = document.querySelector("#shareButton");

    shareButton.addEventListener("click", async () => {
        if(navigator.share){
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href,
                });
            }
            catch (error){
                console.log("sharing cancelled");
            }
        }
        else {
            await navigator.clipboard.writeText(window.location.href);
            console.log("copiert")
        }
       
        })
}

function initAddToCart(product){
    
}