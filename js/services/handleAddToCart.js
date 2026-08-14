import { isLoggedIn } from "../auth/authstorage.js";
import { addToUserCart } from "../storage/cartStorage.js";

export function handleAddToCart(product){
    
    if(!isLoggedIn()){
        // showNeedToBeLoggedInMOdal
        alert("You need to be logged in ");
    }
    else {
        addToUserCart(product);
    }
}