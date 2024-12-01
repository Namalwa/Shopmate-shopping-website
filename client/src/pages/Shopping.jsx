import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductPreview from "../components/ProductPreview";
import ShoppingSidebar from "../components/ShoppingSidebar";
import useCartState from "../Store/useCartState"; 

function Shopping() {
  const [filters, setFilters] = useState({ category: "", productType: "" });
  const { setCart, cart } = useCartState();

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["product", filters],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/products", {
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    enabled: true, 
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    refetch();
  };

  const filteredProducts = (data || []).filter((product) => {
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    const matchesProductType = filters.productType
      ? product.productType === filters.productType
      : true;
    return matchesCategory && matchesProductType;
  });

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const result = await response.json();
      console.log("Product added to cart:", result);
      alert("Product added to cart successfully!");

    
      setCart([...cart, result]);

    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div className="flex">
      <ShoppingSidebar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {filteredProducts.map((product) => (
          <ProductPreview
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Shopping;
