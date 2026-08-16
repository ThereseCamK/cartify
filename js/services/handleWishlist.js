import { isLoggedIn } from "../auth/authstorage.js";
import { addOrRemoveFromUserWishlist } from "../storage/wishListStorage.js";
import { initModal, showModal } from "../components/modal.js";

export function handleToggleWishlist(product){
  
    if(!isLoggedIn()){
        showModal("errorModal",  `You need to be logged
        in before you can add 
        product to your wishlist.`
        );
        initModal("errorModal");
      
        return null;
    }
    else {
       return addOrRemoveFromUserWishlist(product);
    }
}