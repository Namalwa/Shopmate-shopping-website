import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile after component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Assuming JWT is saved in localStorage
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);  // Set user data in state
        setLoading(false);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Navigate to edit profile page
  const handleEdit = () => {
    navigate('/profile/edit');  // Assuming there's an Edit Profile page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-6">Customer Profile</h2>
      <div className="p-4 bg-white rounded-md shadow-md">
        <div>
          <h3 className="text-xl font-bold">Email: {user.email}</h3>
          <p className="mt-2">Name: {user.name}</p>
          <p>Username: {user.username}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;

