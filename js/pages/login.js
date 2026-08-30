
import { createModal } from "../components/modal.js";
import {Login } from "../auth/login.js";
import { basePath } from "../utils/basePath.js";

initLogin();
async function initLogin(){
    const loginContainer = document.querySelector("#loginPage");

    loginContainer.innerHTML = /*HTML */`
       <section>
            <div class="auth-layout">

                <div class="auth-visual">
                    <h1>Welcome back</h1>
                    <h2>Log in to access your cart, wishlist and continue shopping.</h2>
                    <div class="auth-benefit">
                        <p class="auth-label">Your cart</p>
                        <p class="auth-info">
                            Continue shopping with the products you've saved.
                        </p>
                    </div>

                    <div class="auth-benefit">
                        <p class="auth-label">Your wishlist</p>
                        <p class="auth-info">
                            Find your favorite products all in one place.
                        </p>
                    </div>

                    <div class="auth-benefit">
                        <p class="auth-label">Ready to shop?</p>
                        <p class="auth-info">
                            Discover something new or pick up where you left off.
                        </p>
                    </div>
                </div>

                <div class="auth-form-section">

                    <div class="welcome-message">
                        <h1>Welcome back</h1>
                        <h2>Pick up where you left off.
                            
                        </h2>
                    </div>

                    <form>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your.name@stud.noroff.no"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="******"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <button
                                class="btn primary-color"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <div class="social-login">
                        <div class="auth-divider">
                            <span>Or</span>
                        </div>

                        <button type="button" class="social-btn">
                            <img src="${basePath}/assets/icons/google-icon.png" alt="">
                            Continue with Google
                        </button>

                        <button type="button" class="social-btn">
                            <img src="${basePath}/assets/icons/apple-icon.png" alt="">
                            Continue with Apple
                        </button>
                    </div>

                    <div class="auth-switch">
                        <p>Don't have an account?</p>
                        <a href="${basePath}/account/register.html">Create account</a>
                    </div>

                </div>
            </div>
        </section>
        ${createModal(  "loginModal", 
                        "Something went wrong", 
                        "", 
                        ` <button
                            id="closeValidationModal"
                            type="button"
                            class="modal-close"
                        >
                            Try again
                        </button>` )}
    `;

    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const inputUser = {
            email: formData.get('email'),
            password: formData.get("password")
        }
        Login(inputUser);
      
    });
}

