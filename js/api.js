const API_URL = "https://v2.api.noroff.dev/online-shop";

async function getAllProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    
}
getAllProducts();