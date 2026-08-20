import { getProductById } from "../api.js";
import { initAddToCart } from "../utils/initAddToCart.js";
import { getProductPrice } from "../utils/formatPrice.js";

import { getUserWishlist } from "../storage/wishListStorage.js";
import { initToggleWishlist } from "../utils/initToggleWishlist.js";
import { createModal } from "../components/modal.js";

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
        initAddToCart([product], "#add-to-cart");
        initToggleWishlist([product], ".toggleWishlist")
        
      
        
    }
    catch (error){
        console.error(error);

        productPagecontainer.innerHTML = `
            <section class="error-message">
                <h1>Product not found</h1>
                <p>We could not load this product.</p>
                <a href="../index.html">Return to home</a>
            </section>
        `
    }

}

function createProductPageMargup(product){
       const wishlist = getUserWishlist();
       
        let inUsersWishlist = "";
        if(wishlist.includes(product.id)){
            console.log(" is wished for", product.id)
            inUsersWishlist = "wishlisted";
           
        }
        
    return /*HTML */`
        <nav class="breadcrumb">
            <a href="../index.html#shop" >Home</a>
            <span class="separator">|</span>
            <a class="current"> ${product.tags[0]}</a>
            <span class="separator">|</span>
            <a class="current"> ${product.title}</a>
        </nav>
    
        <section class="singleProductCard">
           <a 
            class="toggleWishlist ${inUsersWishlist} wishlistIcon "
            data-id=${product.id}>
                <img src="../assets/icons/heart_black.png">
           </a>
            <img 
                class="product-card-image"
                src="${product.image.url}" 
                alt="${product.image.alt || product.title}"
            >
            <div class="product-information">
                <p class="card-title">
                    ${product.title}
                </p> 

            
               
                <a href="#ratingView"
                    class="review-stars">
                    ${getReviewStars(product)}
                </a>

                <p class="product-description">
                    ${product.description}
                </p>

                  <p class="product-tags">
                    ${product.tags.join(' ')}
                </p>

                <p class="product-price">
                    ${getProductPrice(product)}
                </p>
                  <div class="cart-toast-container"></div>
                 <button 
                    id="add-to-cart"
                    class="btn primary-color add-to-cart"
                    data-id="${product.id}"
                 >
                    Add to cart
                </button>
                 <div class="wishlist-toast-container"></div>
                <button 
                    id="add-to-wishlist"
                    class="btn primary-color toggleWishlist"
                    data-id="${product.id}"
                 >
                    Add to wishlist
                </button>

                <button 
                    id="shareButton" 
                    class=" btn icon-button" 
                    aria-label="Share product"
                >
                    <img src="../assets/icons/small_share_black.png" alt="shareProduct">
                </button>
            </div>
            
        </section>
        <section id="ratingView">
            ${viewRatingInformation(product)}
        </section>
        ${createModal("errorModal",  "Log in to add items",
        `You need to be logged
        in before you can add 
        product to your wishlist or cart.`,
        `
         <a href="../account/login.html"
            class="btn primary-color">
                        Log in
        </a>
                <a href="../account/register.html"
                class="btn ">  
                        Create account
                </a>
                <br>
                 <button class="modal-close">
                 Maybe Later
                 </button>
        `)}
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

  
  

    return `
        <div class="review-stars">
            <span
                class="stars"
                aria-label="${averageRating.toFixed(1)} out of 5 stars"
            >
           ${getStars(roundedRating)}
            </span>

            <span class="review-count">
                Reviews (${reviews.length})
            </span>
        </div>
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


function viewRatingInformation(product){
    let html = '<h3>Reviews</h3>';
    if(product.reviews.length ==0){
        html += `No reviews yet`
    }
    else{
        for(let i = 0; i < product.reviews.length; i++){

                let singleReview = product.reviews[i];
                html += `
                    <div class="reviewInformation">
                        <h4>${singleReview.username}</h4>
                        <p>${getStars(singleReview.rating)}</p>
                        <p>${singleReview.description}</p>
                    </div>
                `
            }
    }
    
    
    
    return html;
}
function getStars(rating){
        const filled = "★".repeat(rating);
        const emptyStars = "☆".repeat(5 - rating);
    return filled + emptyStars;
}

