// getUserCart()
// saveUserCart()
// removeFromCart()
// clearCart()

import { getAuth } from "../auth/authstorage.js";

const CART_KEY = "cartify_carts";

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

    saveAllCarts(carts)

    console.log(userCart)
}

function getAllCarts() {
 const storedCarts = localStorage.getItem(CART_KEY);

    const carts = storedCarts
        ? JSON.parse(storedCarts)
        : {};
        return carts
}

function saveAllCarts(carts){
 localStorage.setItem(
        CART_KEY,
        JSON.stringify(carts)
    );
}