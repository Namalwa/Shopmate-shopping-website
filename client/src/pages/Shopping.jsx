// import React from "react";
// import { useQuery } from "react-query";
// import ProductPreview from "../components/ProductPreview";
// import products from "../data/products"; 

// function Shopping() {
//     const { isLoading, isError, error, data } = useQuery({
//         queryKey: ["product"],
//         queryFn: async () => {
//             const response = await fetch("http://localhost:4000/products", { credentials: "include" });
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             return response.json();
//         },
//     });

//     if (isLoading) {
//         return <h2>Loading, please wait...</h2>;
//     }

//     if (isError) {
//         return <h2>Error: {error.message}</h2>;
//     }

//     const productData = data || products;

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
//             {productData && Array.isArray(productData) ? (
//                 productData.map((product) => (
//                     <ProductPreview
//                         key={product.id}
//                         id={product.id}
//                         title={product.title}
//                         description={product.description}
//                         price={product.price}
//                         imageUrl={product.imageUrl}
//                     />
//                 ))
//             ) : (
//                 <h2>No products available</h2>
//             )}
//         </div>
//     );
// }

// export default Shopping;
// src/pages/Shopping.js

import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductPreview from "../components/ProductPreview";
import ShoppingSidebar from "../components/ShoppingSidebar";
import products from "../data/products"; 

function Shopping() {
    const [filters, setFilters] = useState({ category: "", productType: "" });

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const response = await fetch("http://localhost:4000/products", { credentials: "include" });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            return response.json();
        },
    });

    const productData = data || products;

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    
    const filteredProducts = productData.filter((product) => {
        const matchesCategory = filters.category ? product.category === filters.category : true;
        const matchesProductType = filters.productType ? product.productType === filters.productType : true;
        return matchesCategory && matchesProductType;
    });

    if (isLoading) {
        return <h2>Loading, please wait...</h2>;
    }

    if (isError) {
        return <h2>Error: {error.message}</h2>;
    }

    return (
        <div className="flex">
            <ShoppingSidebar onFilterChange={handleFilterChange} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductPreview
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            imageUrl={product.imageUrl}
                        />
                    ))
                ) : (
                    <h2>No products available</h2>
                )}
            </div>
        </div>
    );
}

export default Shopping;
