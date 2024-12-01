import React from "react";
import { GrFavorite } from "react-icons/gr";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { NavLink, Link } from "react-router-dom";
import shopmateLogo from "../assets/shopmate.png";
import AdminAccount from "../Admindashboard/pages/AdminAccount"; 

function CustomerHeader() {
  return (
    <header className="bg-white p-4">
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
    {/* Brands Link */}
    {/* <NavLink
      to="/brands"
      className={({ isActive }) =>
        isActive ? "text-orange-600" : "hover:text-orange-600"
      }
    >
      Brands
    </NavLink> */}

    {/* Shopping Link */}
    <NavLink
      to="/shopping"
      className={({ isActive }) =>
        isActive ? "text-orange-600" : "hover:text-orange-600"
      }
    >
      Shopping
    </NavLink>

   
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive ? "text-orange-600" : "hover:text-orange-600"
      }
    >
      About
    </NavLink>
  </nav>
</div>


       
        <div className="flex items-center space-x-6">
         
          <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center text-white text-lg font-bold">
           
            <AdminAccount />
          </div>

          
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

          {/* Favorites Icon */}
          <NavLink
            to="/favourites"
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
    </header>
  );
}

export default CustomerHeader;
