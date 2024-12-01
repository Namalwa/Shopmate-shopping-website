import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";

function ProfileModal({ isOpen, onClose }) {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast("Login successful!");
      onClose();

      if (data.user && data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (data.user && data.user.role === "CUSTOMER") {
        navigate("/shopping");
      } else {
        console.error("Unknown role:", data.user ? data.user.role : "No role");
      }
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (signupData) => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast("Signup successful!");
      if (data.role === "ADMIN") {
        navigate("/shopping");
      } else {
        setIsSignupModalOpen(false);
        navigate("/customer");
      }
    },
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    loginMutation.mutate({
      usernameoremail: usernameOrEmail,
      password: password,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    signupMutation.mutate({
      firstname,
      lastname,
      username,
      email: usernameOrEmail,
      password,
      role,
    });
  };

  const handleToggleModal = () => {
    setIsSignupModalOpen((prev) => !prev);
    setError(null);
    setFirstname("");
    setLastname("");
    setUsername("");
    setUsernameOrEmail("");
    setPassword("");
    setRole("CUSTOMER");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-lg"
          onClick={onClose}
        >
          &times;
        </button>
        {isSignupModalOpen ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Sign Up</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="text-sm mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleToggleModal}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Login</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username or Email
                </label>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-sm mt-4 text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleToggleModal}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileModal;
