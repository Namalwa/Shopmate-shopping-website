import React from "react";

function ProductPreview({ id, title, description, price, imageUrl, onAddToCart }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover mb-4 rounded-md"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-lg font-bold mb-4">${price}</p>
      <button
        onClick={() => onAddToCart(id, 1)} 
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductPreview;
