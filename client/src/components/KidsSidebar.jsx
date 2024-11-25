import React from "react";

function Sidebar({
  selectedProduct,
  setSelectedProduct,
  selectedPrice,
  setSelectedPrice,
}) {
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  return (
    <aside className="w-64 h-full bg-orange-50 p-6 border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-orange-600 mb-2">
          Product Type
        </label>
        <select
          value={selectedProduct}
          onChange={handleProductChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
        >
          <option value="All">All</option>
          <option value="Kids Shoes">Kids Shoes</option>
          <option value="Kids Dresses">Kids Dresses</option>
          <option value="Kids Toys">Kids Toys</option>
        </select>
      </div>
      <div>
        <label className="block text-lg font-medium text-orange-600 mb-2">
          Price Range
        </label>
        <select
          value={selectedPrice}
          onChange={handlePriceChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
        >
          <option value="All Prices">All Prices</option>
          <option value="Under $20">Under $20</option>
          <option value="$20 - $50">$20 - $50</option>
          <option value="$50 - $100">$50 - $100</option>
          <option value="Above $100">Above $100</option>
        </select>
      </div>
    </aside>
  );
}

export default Sidebar;
