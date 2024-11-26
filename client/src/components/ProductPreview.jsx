import React from "react";
import { useNavigate } from "react-router-dom";

function ProductPreview({ id, title, description, price, imageUrl }) {
    const navigate = useNavigate();

    function handleNavigateToFullProduct() {
        if (!id) return;
        navigate(`/product/${id}`);
    }

    return (
        <div 
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition duration-300"
            onClick={handleNavigateToFullProduct}
            role="button"
            tabIndex={0}
        >
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-lg font-medium text-blue-500">${price.toFixed(2)}</p>
        </div>
    );
}

export default ProductPreview;
