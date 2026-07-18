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
        <div>
            <img
                src="../assets/icons/cartify_mobile_icon.png"
                alt="Cartify"
            >

            ${authElement}

            <a href="../cart/index.html">
                Cart
            </a>
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
