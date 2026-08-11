import { isLoggedIn } from "../auth/authstorage.js";
import { addOrRemoveFromUserWishlist } from "../storage/wishListStorage.js";

export function handleToggleWishlist(product){
    console.log(product)
    if(!isLoggedIn()){
        // showNeedToBeLoggedInMOdal
        alert("You need to be logged in ");
        return null;
    }
    else {
       return addOrRemoveFromUserWishlist(product);
    }
}