import React from "react";
import AdminAccount from "../pages/AdminAccount";

const UserHeader = () => {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      <AdminAccount />
    </header>
  );
};

export default UserHeader;
