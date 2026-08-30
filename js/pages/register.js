import { registerUser } from "../api.js";
import { createModal, showModal, initModal } from "../components/modal.js";
import { basePath } from "../utils/basePath.js";
initRegister();

async function initRegister() {
    const registerPageContainer = document.querySelector("#registerPage");

    registerPageContainer.innerHTML = /*HTML*/ `
        <section >
        
          <div class="auth-layout">
            <div class="auth-visual">
                <h1>Create your account</h1>
                <h2>Join Cartify and enjoy a better shopping experience.</h2>
                 <div class="auth-benefit">
                    <p class="auth-label">Create your account</p>
                    <p class="auth-info">Join Cartify and make shopping simple.</p>
                </div>

                <div class="auth-benefit">
                    <p class="auth-label">Easy checkout</p>
                    <p class="auth-info">Add products to your cart and complete your purchase.</p>
                 </div>
                
                <div class="auth-benefit">
                    <p class="auth-label">Save your cart</p>
                    <p class="auth-info">Your cart is saved to your account, so you can come back later.</p>
                 </div>
                
                <div class="auth-benefit">
                    <p class="auth-label">Wishlist</p>
                    <p class="auth-info">Save your favorite products and find them again easily.</p>
                </div>
                
              
                </div>

            <div class="auth-form-section">
                <div class="welcome-message">
                    <h1>Create account</h1>
                    <h2>Sign up to shop products from Cartify.</h2>
                </div>
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                            <div class="input-wrapper">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your Name "
                                    required
                                >

                                <div class="input-tooltip">
                                    Username can only contain:
                                    <br>
                                    • Letters a-z
                                    <br>
                                    • Numbers 0-9
                                    <br>
                                    • Underscore _
                                </div>
                            </div>
                    </div>
                    <div class="form-group">
                        <label for="emailAddress">Email Address</label>
                            <div class="input-wrapper">
                                <input 
                                    type="email" 
                                    id="emailAddress" 
                                    name="emailAddress"
                                    placeholder="Enter your Email "
                                    required 
                                >
                                <div class="input-tooltip">
                                    Email must contain:
                                    <br>
                                    • stud.noroff.no mail
                                
                                    
                                </div>
                            </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                            <div class="input-wrapper">
                                <input 
                                    type="password" 
                                    id="registerPassword" 
                                    name="registerPassword"
                                    placeholder="Create your password"
                                    required 
                                >
                                <div class="input-tooltip">
                                    Password must contian:
                                    <br>
                                    • at leat 8 chars

                                </div>
                            </div>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            required 
                        >
                    </div>
                    <div class="form-group">
                    <button 
                        class="btn primary-color"
                        type="submit"
                    >
                        Create account
                    </button>
                    </div>
                    
                </form>
                <div class="social-login">
                    <div class="auth-divider">
                        <span>Or</span>
                    </div>

                    <button type="button" class="social-btn google-btn">
                        <img src="../assets/icons/google-icon.png" alt="">
                        Sign up with Google
                    </button>

                    <button type="button" class="social-btn apple-btn">
                        <img src="${basePath}/assets/icons/apple-icon.png" alt="">
                        Sign up with Apple
                    </button>
                </div>
                   <div class="auth-switch">
                <p>Allready have an account? </p>
                <a href="${basePath}/account/login.html">Log in here! </a>
            </div> 
            </div>
          </div>
            
            
            
        </section>
        ${createModal("validationModal", "Something went wrong", "", 
            /*HTML*/` 
                <button
                    id="closeValidationModal"
                    type="button"
                   class="modal-close"
                >
                    Try again
                </button>`)}
    `

    const form = document.querySelector("form");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            if(formData.get("registerPassword") === formData.get("confirmPassword")){
                const inputNewUser = {
                    name: formData.get('name'),
                    email: formData.get('emailAddress'),
                    password: formData.get("registerPassword")
                }
                registerNewUser(inputNewUser);
                console.log(inputNewUser);
            }
            else{
               showModal("validationModal", 
                'The password did not match');
                initModal("validationModal");
            }
            });
}

async function registerNewUser(user) {
       try {

        const newUser = await registerUser(user);
       
        window.location.href= "./login.html";

    } catch (error) {

        showModal("validationModal", error.message);
        initModal("validationModal");

    }
}

 

