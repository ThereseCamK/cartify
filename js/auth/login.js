import { loginUser } from "../api.js";
import { saveAuth } from "../auth/authstorage.js";
import { showValidationModal, initValidationModal } from "../components/modal/validationModal.js";
export async function Login(user){
 try {
        const loggedInUser= await loginUser(user);
        console.log("logged in: ", loggedInUser);
        saveAuth(loggedInUser);
        window.location.href= "../index.html";
    }
    catch (error){
        showValidationModal(error.message);
        initValidationModal();
    }
}