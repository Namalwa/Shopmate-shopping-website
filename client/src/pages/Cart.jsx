import { useEffect, useState } from "react";
import useCartState from "../Store/useCartState"; 

function Cart() {
  const { cart, setCart } = useCartState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      
    }
  }, [cart]);

  
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  
  if (loading) return <p>Loading...</p>;

  
  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">Your Cart</h1>
      </header>
      <main className="p-6">
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={item.product.imageUrl || "default-product-image.jpg"}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                <p className="text-gray-600">{item.product.description}</p>
                <p className="text-gray-600">Price: ${item.product.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-800 font-semibold">
                  Subtotal: ${item.product.price * item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Cart;
