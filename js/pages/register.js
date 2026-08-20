import { registerUser } from "../api.js";
import { createModal, showModal, initModal } from "../components/modal.js";
initRegister();

async function initRegister() {
    const registerPageContainer = document.querySelector("#registerPage");

    registerPageContainer.innerHTML = /*HTML*/ `
        <section>
            <div 
                    class="welcome-message"
                >
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
            <div
              class="register-link-wrapper"
            >
                <p>Allready have an account? </p>
                <a href="./login.html">Log in here! </a>
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
       
        window.location.href= "./login.html#shop";

    } catch (error) {

        showModal("validationModal", error.message);
        initModal("validationModal");

    }
}

 

