import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    fetchProfile();
  }, [navigate]);

  if (loading) return null;
  if (error) return null;

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=random`}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-teal-500"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg p-4 w-64 z-50">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Hello, {user?.firstname}
          </h1>
          <p className="text-gray-600">{user?.email}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/updateProfile")}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccount;
