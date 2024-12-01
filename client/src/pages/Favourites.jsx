import React from "react";
import useFavoritesState from "../Store/favoritesStore";

function Favourites() {
  const { favorites, removeFavorite } = useFavoritesState();

  if (favorites.length === 0) {
    return <p>No favorite products.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Favorite Products</h1>
      <div className="space-y-4">
        {favorites.map((product) => (
          <div key={product.id} className="flex justify-between bg-white p-4 rounded shadow">
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
            <button
              onClick={() => removeFavorite(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
