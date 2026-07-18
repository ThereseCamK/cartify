import { registerUser } from "../api.js";
initRegister();

async function initRegister() {
    const registerPageContainer = document.querySelector("#registerPage");

    registerPageContainer.innerHTML = /*HTML*/ `
        <section>
            <form>
                <div class="form-group">
                    <label for="name">Full name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Enter your full name"
                        required 
                    >
                </div>
                <div class="form-group">
                    <label for="emailAddress">Email Address</label>
                    <input 
                        type="email" 
                        id="emailAddress" 
                        name="emailAddress"
                        placeholder="Enter your Email"
                        required 
                    >
                </div>
                 <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <input 
                        type="password" 
                        id="registerPassword" 
                        name="registerPassword"
                        placeholder="Create your password"
                        required 
                    >
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
                <button type="submit">Create account</button>
            </form>
            <p>Allready have an account? </p><a href="./login.html"> Log in here! </a>     
        </section>
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
                alert("something went wrong")
            }
            });
}

async function registerNewUser(user) {
       try {

        const newUser = await registerUser(user);
        console.log("Registered:", newUser);

    } catch (error) {

        console.error(error);

    }
}

 

