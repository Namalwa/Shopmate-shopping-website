import React, { useState } from "react";

const categories = ["ACCESSORIES", "BEAUTY", "KIDS", "MEN", "WOMEN"];
const productTypes = {
  ACCESSORIES: ["BAGS", "JEWELRY", "STOCKINGS"],
  BEAUTY: ["MAKEUP", "LOTION", "SERUM"],
  KIDS: ["KIDS_SHOES", "KIDS_DRESSES", "KIDS_TOYS"],
  MEN: ["MEN_SHOES", "MEN_SHIRTS"],
  WOMEN: ["WOMEN_SHOES", "WOMEN_DRESSES"],
};

function ShoppingSidebar({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedProductType("");
    onFilterChange({ category, productType: "" });
  };

  const handleProductTypeChange = (event) => {
    const productType = event.target.value;
    setSelectedProductType(productType);
    onFilterChange({ category: selectedCategory, productType });
  };

  return (
    <div className="p-4 border-r bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      <select value={selectedCategory} onChange={handleCategoryChange} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h2 className="text-xl font-bold mb-4">Filter by Product Type</h2>
      <select
        value={selectedProductType}
        onChange={handleProductTypeChange}
        className="w-full p-2 border rounded"
        disabled={!selectedCategory}
      >
        <option value="">Select Product Type</option>
        {selectedCategory &&
          productTypes[selectedCategory].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </select>
    </div>
  );
}

export default ShoppingSidebar;
