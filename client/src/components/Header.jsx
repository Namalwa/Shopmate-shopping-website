import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { NavLink, Link } from "react-router-dom";
import shopmateLogo from "../assets/shopmate.png";
import ProfileModal from "../components/ProfileModal";

function Header() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <header className="bg-white p-4">
      <div className="w-full max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search for items and brands"
          className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={shopmateLogo}
              alt="Shopmate Logo"
              className="max-w-xs max-h-24 object-contain"
            />
          </Link>
        </div>

        <div className="w-full">
          <nav className="flex space-x-10 text-lg justify-center">
            {["accessories", "beauty", "men", "women", "kids", "brands"].map(
              (category) => (
                <NavLink
                  key={category}
                  to={`/${category}`}
                  className={({ isActive }) =>
                    isActive ? "text-orange-600" : "hover:text-orange-600"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleProfileModal}
            className="text-gray-700 text-3xl hover:text-orange-600"
          >
            <CgProfile />
          </button>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 text-2xl"
                : "text-gray-700 text-2xl hover:text-orange-600"
            }
          >
            <PiShoppingCartSimpleBold />
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 text-2xl"
                : "text-gray-700 text-2xl hover:text-orange-600"
            }
          >
            <GrFavorite />
          </NavLink>
        </div>
      </div>

      <ProfileModal isOpen={isProfileModalOpen} onClose={toggleProfileModal} />
    </header>
  );
}

export default Header;
