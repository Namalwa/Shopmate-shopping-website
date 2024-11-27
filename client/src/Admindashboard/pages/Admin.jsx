import React from "react";
import Sidebar from "../components/Sidebar";
import UserHeader from "../components/UserHeader";

function Admin() {
  return (
    <div className="flex flex-col h-screen">
      <UserHeader />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the admin panel
          </h2>
          <p>
            From here, you can manage products, categories, and upload new
            images.
          </p>
        </main>
      </div>
    </div>
  );
}

export default Admin;
