import { getAuth } from "../auth/authstorage.js";

const CART_KEY = "cartify_carts";

export function getUserCart(){
    
    const user = getAuth();

    if (!user) {
        return [];
    }
    const carts = getAllCarts();
    const userCart = carts[user.email] || [];
    console.log(userCart);
    return userCart
}
export function saveUserCart(){}


export function removeFromCart(productId){
    
    const user = getAuth();

    if (!user) {
        return [];
    }

    const carts = getAllCarts();
    const userCart = carts[user.email] || [];

    carts[user.email] = userCart.filter(
        item => item.id !== productId
    );

    saveAllCarts(carts);

    return carts[user.email];
}

export function clearCart(){
   const user = getAuth();

    if (!user) {
        return [];
    }

    const carts = getAllCarts();

    carts[user.email] = []; 

    saveAllCarts(carts); 
    return carts[user.email];
   

}


function getAllCarts() {
 const storedCarts = localStorage.getItem(CART_KEY);

    const carts = storedCarts
        ? JSON.parse(storedCarts)
        : {};
        return carts
}

export function addToUserCart(product) {
    const user = getAuth();

    if (!user) {
        return;
    }

   
    const carts = getAllCarts();
    const userCart = carts[user.email] || [];

    const existingProduct = userCart.find(
        (cartItem) => cartItem.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        userCart.push({
            ...product,
            quantity: 1
        });
    }

    carts[user.email] = userCart;
    console.log(userCart)
    saveAllCarts(carts)

    
}

function saveAllCarts(carts){
 localStorage.setItem(
        CART_KEY,
        JSON.stringify(carts)
    );
}

export function increaseItemInCart(productId){
     const user = getAuth();

    if (!user) {
        return [];
    }

    const carts = getAllCarts();
    const userCart = carts[user.email] || [];

    const productInCart = userCart.find(product => product.id === productId);
    if(!productInCart) return userCart;

    productInCart.quantity ++;

    carts[user.email] = userCart;

    saveAllCarts(carts);

    return userCart;

}

export function decreaseItemInCart(productId){
     const user = getAuth();

    if (!user) {
        return [];
    }

    const carts = getAllCarts();
    const userCart = carts[user.email] || [];

    const productIndex = userCart.findIndex(
        product => product.id === productId
    );

    if (productIndex === -1) {
        return userCart;
    }

    const productInCart = userCart.find(product => product.id === productId);
    if(!productInCart) return userCart;
    if(productInCart.quantity === 1){
  
       userCart.splice(productIndex, 1)
    }
    else{
        productInCart.quantity --;
    }
    

    carts[user.email] = userCart;

    saveAllCarts(carts);

    return userCart;

}