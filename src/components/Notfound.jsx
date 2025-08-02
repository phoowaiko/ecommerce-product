import React from "react";

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQah51t4omzD63YjDxISxGn4EcST-_2De_5cQ&s"
          alt="404 Not Found"
          className="w-80 mb-4"
        />
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-2">Oops! Page not found.</p>
        <br />
        <a
          href="/"
          className="mt-4 px-6 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
export default Notfound;
