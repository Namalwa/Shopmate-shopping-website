import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import kidsShoes from "../Data/kidshoes";
import kidsDressing from "../Data/kidsdressing";

function Kids() {
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All Prices");


  const allItems = [...kidsShoes, ...kidsDressing];

  const filterItems = (item) => {
  
    console.log("Item:", item);

    
    if (selectedProduct !== "All" && item.type.toLowerCase() !== selectedProduct.toLowerCase()) {
      return false;
    }

  
    if (selectedPrice !== "All Prices") {
      if (selectedPrice === "Under $20" && item.price >= 20) return false;
      if (selectedPrice === "$20 - $50" && (item.price < 20 || item.price > 50)) return false;
      if (selectedPrice === "$50 - $100" && (item.price < 50 || item.price > 100)) return false;
      if (selectedPrice === "Above $100" && item.price <= 100) return false;
    }

    return true;
  };

  const filteredItems = allItems.filter(filterItems);
  console.log("Filtered Items:", filteredItems); 

  return (
    <div className="flex">
      <Sidebar
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Kids Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className="bg-white shadow-md overflow-hidden h-auto relative transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={item.imageUrl}
                alt={item.description || "Kids item"}
                className="w-full h-72 object-cover"
                onError={(e) => { e.target.src = "/placeholder.jpg"; }} 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.description || "No description"}</h3>
                <p className="text-gray-700 mt-1">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Kids;
