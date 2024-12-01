import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Admin from "./Admindashboard/pages/Admin";
import AddProduct from "./Admindashboard/components/AddProduct";
import ProductList from "./Admindashboard/components/ProductList";
import ProductDetails from "./Admindashboard/components/ProductDetails";
import Edit from "./Admindashboard/pages/Edit";
import Shopping from "./pages/Shopping";
import UpdateProfile from "./components/UpdateProfile";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites"; // Assuming you have this page
import Customer from "./Customerdashboard/Customer";
import CustomerHeader from "./Customerdashboard/CustomerHeader";
import About from "./pages/About";



const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Main />
      </Router>
    </QueryClientProvider>
  );
}

function Main() {
  const location = useLocation();

  // Determine which header should be shown based on the route
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isCustomerRoute = location.pathname.startsWith("/customer");
  const isShoppingOrAboutRoute =
    location.pathname === "/shopping" || location.pathname === "/about";
  const isProfileOrCartOrFavouritesRoute =
    location.pathname === "/updateProfile" ||
    location.pathname === "/cart" ||
    location.pathname === "/favourites"; // Include favourites here
  const isExcludedHeaderRoute =
    isAdminRoute || isShoppingOrAboutRoute || isProfileOrCartOrFavouritesRoute;

  return (
    <>
      {/* Show the default Header for all routes except the ones where CustomerHeader should be shown */}
      {!isExcludedHeaderRoute && <Header />}

      {/* Show CustomerHeader for customer-related routes, cart, favourites, and updateProfile */}
      {(isCustomerRoute || isShoppingOrAboutRoute || isProfileOrCartOrFavouritesRoute) && <CustomerHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} /> {/* Added Favourites route */}
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/products/edit/:id" element={<Edit />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/shopping" element={<Shopping />} />
      </Routes>
    </>
  );
}

export default App;
