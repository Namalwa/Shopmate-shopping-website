import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("personalInfo");
  const [cart, setCart] = useState([]); // State for cart items

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile/user", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
          }
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      try {
        // Fetch the user's cart from the backend or local storage
        const response = await fetch(`http://localhost:4000/users/${user?.id}/cart`);
        const cartData = await response.json();
        setCart(cartData); // Update the cart state with the fetched data
      } catch (err) {
        console.log('Failed to fetch cart:', err);
      }
    };

    fetchProfile();
  }, [navigate, user?.id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">My Account</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=random`}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-teal-500"
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user?.firstname} {user?.lastname}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-b-2 border-gray-200">
        <button
          className={`mr-6 pb-2 ${
            activeTab === "personalInfo" ? "border-teal-500 border-b-4 font-bold text-teal-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("personalInfo")}
        >
          Personal Info
        </button>
        <button
          className={`mr-6 pb-2 ${
            activeTab === "cart" ? "border-teal-500 border-b-4 font-bold text-teal-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("cart")}
        >
          Cart
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "personalInfo" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-gray-600">Full Name:</span>{" "}
                <span className="font-bold">{user?.firstname} {user?.lastname}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email:</span>{" "}
                <span className="font-bold">{user?.email}</span>
              </div>
              <button
                onClick={() => navigate("/updateProfile")}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 mt-4"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "cart" && (
          <div>
            <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty. Start adding items!</p>
            ) : (
              <div>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b py-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-teal-500 font-semibold">${item.price}</span>
                      <button
                        onClick={() => {} /* Implement remove from cart logic */}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
