import { isLoggedIn, logout } from "../auth/authstorage.js";


export default function Header() {
    const isUserLoggedIn = isLoggedIn();

    const authElement = isUserLoggedIn
        ? `
            <button id="logoutBtn" type="button">
                Log out
            </button>
          `
        : `
            <a href="../account/login.html">
                Log in
            </a>
          `;

    return /* HTML */ `
        <div class="header">
            
        <a href="../index.html"><img 
            class="header-logo"
                src="../assets/icons/cartify_mobile_icon.png"
                alt="Cartify"
            >
        </a>
            <div class="header-items">
            <img
                src="../assets/icons/profile.png"
                alt="Log in og out">
                ${authElement}
            </div>
           
            <div
                class="header-items">
                 <img
                    src="../assets/icons/CART.png"
                    alt="your cart"
                >
                <a
                href="../cart/index.html">
                    Cart   
                </a>
            </div>
            
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
}
