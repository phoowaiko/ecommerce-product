import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

function AdminLayout() {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="w-full  mb-1.5 overflow-auto bg-white-50">
          <header className="">
            <h1 className="text-3xl font-semibold p-5 w-full  bg-gray-50">
              Ecommerce Website
            </h1>
            <div className="p-4">
              <Outlet />
            </div>
          </header>
        </main>
      </div>
      );
    </>
  );
}

export default AdminLayout;
