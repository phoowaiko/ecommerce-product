import React from "react";
import { Link } from "react-router";

function sidebar() {
  return (
    <aside className="w-64  shadow-md p-4 ">
      <div className="border-b ">
        <h2 className="text-2xl font-bold mb-6 ">Admin Panel</h2>
      </div>

      <nav className="space-y-4 p-3">
        <Link
          to={"/admin/orders"}
          className="block text-gray-700 hover:text-blue-500"
        >
          📦 Orders
        </Link>

        <Link
          to={"/admin/products"}
          className="block text-gray-700 hover:text-blue-500"
        >
          🛒 Products
        </Link>

        <Link
          to={"/admin/categories"}
          className="block text-gray-700 hover:text-blue-500"
        >
          🔖 categories
        </Link>
      </nav>
    </aside>
  );
}

export default sidebar;
