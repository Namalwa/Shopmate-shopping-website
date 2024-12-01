import { useEffect, useState } from "react";
import useCartState from "../Store/useCartState"; 
import useUserState from "../Store/useUserState";

function Cart() {
  const { cart, setCart } = useCartState();
  const { token } = useUserState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Cart data:", data); 
        setCart(data); // Ensure this is an array
      } else {
        console.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!Array.isArray(cart) || cart.length === 0) return <p>Your cart is empty.</p>;

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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Cart;
