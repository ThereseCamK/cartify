const API_URL = "https://v2.api.noroff.dev/online-shop";

 export async function getAllProducts() {
    const response = await fetch(API_URL);
    if(!response.ok){
        throw new Error(
            `Failed to fetch products: ${response.ok}`
        );
    }

    const data = await response.json();
    const products = data.data;
    
    return products;
    
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok) throw new Error(`Failed to fetch products: ${response.ok}`);
    const result = await response.json();
    const singleProduct = result.data;
    return singleProduct;
    
}
