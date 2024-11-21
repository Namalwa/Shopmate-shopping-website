import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import Beauty from "./pages/Beauty";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import ProfileModal from "./components/ProfileModal";

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

  return (
    <>
      
      {location.pathname !== "/admin" && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/admindashboard" element={<ProfileModal />} />
      </Routes>
    </>
  );
}

export default App;
