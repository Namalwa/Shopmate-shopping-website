import React from "react";
import Sidebar from "../components/Sidebar";


function Admin() {
  return (
    <div className="flex">
      <Sidebar/>
    
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>
          Welcome to the admin panel. From here, you can manage products,
          categories, and upload new images.
        </p>
      </main>
    </div>
  );
}

export default Admin;

