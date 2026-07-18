const API_URL = "https://v2.api.noroff.dev/online-shop";
const API_URL_LOGIN = "https://v2.api.noroff.dev/auth/login";
const API_URL_REGISTER = "https://v2.api.noroff.dev/auth/register";

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



export async function registerUser(user) {
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Registration error response:", result);

    const message =
      result.errors?.[0]?.message ||
      result.message ||
      "Registration failed";

    throw new Error(message);
  }

  return result.data;
}

export async function loginUser(user) {
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Login error response:", result);

    const message =
      result.errors?.[0]?.message ||
      "Login failed";

    throw new Error(message);
  }

  return result.data;
}
