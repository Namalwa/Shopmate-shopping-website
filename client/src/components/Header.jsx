import { CgProfile } from "react-icons/cg";
import { GrFavorite } from "react-icons/gr";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import shopmateLogo from "../assets/shopmate.png";

function Header() {
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
          <img
            src={shopmateLogo}
            alt="shopmatelogo"
            className="max-w-xs max-h-24 object-contain"
          />
        </div>

        <div className="w-full">
          <nav className="flex space-x-10 text-lg justify-center">
            <NavLink to="/accessories" className="hover:text-orange-600">
              Accessories
            </NavLink>
            <NavLink to="/beauty" className="hover:text-orange-600">
              Beauty
            </NavLink>
            <NavLink to="/men" className="hover:text-orange-600">
              Men
            </NavLink>
            <NavLink to="/women" className="hover:text-orange-600">
              Women
            </NavLink>
            <NavLink to="/kids" className="hover:text-orange-600">
              Kids
            </NavLink>
            <NavLink to="/brands" className="hover:text-orange-600">
              Brands
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/account"
            className="text-3xl text-gray-700 hover:text-orange-600"
          >
            <CgProfile />
          </NavLink>

          <NavLink
            to="/cart"
            className="text-2xl text-gray-700 hover:text-orange-600"
          >
            <PiShoppingCartSimpleBold />
          </NavLink>

          <NavLink
            to="/favorites"
            className="text-2xl text-gray-700 hover:text-orange-600"
          >
            <GrFavorite />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
