import { allowedTags, categories } from "../config/categories.js";

export default function filterByCategory(products, category){
    if(category === "all"){
       
        return products.filter((product) =>
        product.tags.some((tag) => allowedTags.includes(tag))
    );
    }

    const categoryTags = categories[category];

    console.log(categoryTags)

    return products.filter((product) =>
        product.tags.some((tag) => categoryTags.includes(tag))
    );
}