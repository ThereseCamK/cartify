import { isLoggedIn, logout } from "../auth/authstorage.js";
import { getCartItemCount , updateCartCount } from "../utils/cartCount.js";
import { basePath } from "../utils/basePath.js";



export default function Header({showSearch = false}) {
  
    const isUserLoggedIn = isLoggedIn();
    const cartCount = getCartItemCount();

    const authElement = isUserLoggedIn
        ? `
            <a id="logoutBtn" class="btn-text">
                Log out
            </a>
          `
        : `
            <a 
            href="${basePath}/account/login.html">
                Log in
            </a>
          `;

   

    return /* HTML */ `
    <div class="header">
        
    <a href="${basePath}/index.html" class="header-logo-link" aria-label="Cartify home">
        <img class="header-logo" src="${basePath}/assets/icons/cartify_mobile_icon.png" alt="Cartify ">
    </a>

  
    <div class="header-actions">
        <div class="header-items profile-item">
            <img src="${basePath}/assets/icons/profile.png" alt="Log in og out">
            ${authElement}
        </div>
        <div class="header-items cart-item">
            <a href="${basePath}/cart/index.html" class="cart-icon-wrapper">
                <div class="cart-count">
                    ${cartCount}
                </div>
                <img src="${basePath}/assets/icons/CART.png" alt="your cart">
            </a>
            <a href="${basePath}/cart/index.html" class="cart-text">
                Cart   
            </a>
        </div>
    </div>


    ${showSearch ? 
        `<input type="search" 
            id="searchInput" 
            placeholder="Search for products">` 
        : ""}
        
        
    </div>
    <div class="toast-container"></div>
    
    `;
}
export function initHeader() {
    const logoutBtn =
        document.querySelector("#logoutBtn");

    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener("click", () => {
        logout();

        window.location.href = `${basePath}/index.html`;
    });
    updateCartCount();

    
}


