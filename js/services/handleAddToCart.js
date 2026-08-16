import { isLoggedIn } from "../auth/authstorage.js";
import { addToUserCart } from "../storage/cartStorage.js";
import { showModal, initModal } from "../components/modal.js";
import { showToast } from "../components/toast.js";

export function handleAddToCart(product){
    
    if(!isLoggedIn()){
       initModal("errorModal");
       showModal("errorModal",
        `You need to be logged
        in before you can add 
        product to your cart.
        ` );
    ;
        
    }
    else {
        addToUserCart(product);

        showToast( `${product.title} is added to your cart.`);
    }
}