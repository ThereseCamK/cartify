import { isLoggedIn, logout } from "../auth/authstorage.js";
import { getUserCart } from "../storage/cartStorage.js";
import { getCartItemCount , updateCartCount } from "../utils/cartCount.js";




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
            href="../account/login.html">
                Log in
            </a>
          `;

   

    return /* HTML */ `
    <div class="header">
        
    <a href="../index.html" class="header-logo-link">
        <img class="header-logo" src="../assets/icons/cartify_mobile_icon.png" aria-label="Cartify home">
    </a>

  
    <div class="header-actions">
        <div class="header-items profile-item">
            <img src="../assets/icons/profile.png" alt="Log in og out">
            ${authElement}
        </div>
        <div class="header-items cart-item">
            <a href="../cart/index.html" class="cart-icon-wrapper">
                <div class="cart-count">
                    ${cartCount}
                </div>
                <img src="../assets/icons/CART.png" alt="your cart">
            </a>
            <a href="../cart/index.html" class="cart-text">
                Cart   
            </a>
        </div>
    </div>


    ${showSearch ? 
        `<input type="search" 
            id="searchInput" 
            placeholder="Search for products">` 
        : ""}
        
        <div class="toast-container"></div>
    </div>
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

        window.location.href = "../index.html";
    });
    updateCartCount();

    
}


