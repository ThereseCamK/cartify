const API_URL = "https://v2.api.noroff.dev/online-shop";

 export async function getAllProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;
    
    return products;
    
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok) throw new Error("Product not found");
    
    return await response.json()
    
}
