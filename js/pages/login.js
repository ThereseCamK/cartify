
import { createModal } from "../components/modal.js";
import {Login } from "../auth/login.js";

initLogin();
async function initLogin(){
    const loginContainer = document.querySelector("#loginPage");

    loginContainer.innerHTML = /*HTML */`
        <section>
         <div 
                    class="welcome-message"
                >
                <h1>Welcome back</h1>
                <h2>Log in to your account to continue.</h2>
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
                    </button></div>
                 
                </form>
                <p>Don't have an account? </p><a href="./register.html"> Register here! </a>     
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

