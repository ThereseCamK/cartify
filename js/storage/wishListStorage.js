import { getAuth } from "../auth/authstorage.js";

const WISHLIST_KEY = "cartify_wishlists";

export function getUserWishlist(){
    const user = getAuth();

    if(!user){
        return [];
    }

    const wishlists = getAllWishlists();
    const userWishlist = wishlists[user.email] || [];

    return userWishlist;
}

function getAllWishlists(){
    const storedWishlist = localStorage.getItem(WISHLIST_KEY);

    const wishlists = storedWishlist 
            ? JSON.parse(storedWishlist) 
            : {};
            return wishlists;
} 

export function addOrRemoveFromUserWishlist(product){
    console.log(product, "kjører")
    const user = getAuth();

    if(!user){
        return;
    }

    const wishlists = getAllWishlists();
    const userWishlist = wishlists[user.email] || [];

    
    let updatedWishlist = [];

    if(userWishlist.includes(product.id)) {
        updatedWishlist = userWishlist.filter(item => item !== product.id);
    }
    else {
        updatedWishlist = [
            ...userWishlist,
            product.id
        ];
    }

    wishlists[user.email] = updatedWishlist;

    saveAllWishlists(wishlists);
    console.log(updatedWishlist);
    return updatedWishlist;
}

function saveAllWishlists(wishlist){
    localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(wishlist)
    );
}