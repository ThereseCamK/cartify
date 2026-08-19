import { loginUser } from "../api.js";
import { saveAuth } from "../auth/authstorage.js";
import { showModal, initModal } from "../components/modal.js";
export async function Login(user){
 try {
        const loggedInUser= await loginUser(user);
       
        saveAuth(loggedInUser);
        window.location.href= "../index.html";
    }
    catch (error){
        showModal("loginModal", error.message);
        
        initModal("loginModal");
    }
}