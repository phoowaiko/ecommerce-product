import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function AdminCategoriesform() {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const category = {
      categoryName,
    };

    let res;
    if (id) {
      res = await axios.put(
        "http://127.0.0.1:8000/api/categories/" + id,
        category,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } else {
      res = await axios.post("http://127.0.0.1:8000/api/categories", category, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(res.data);
    }
    if (res.data.errors) {
      setError(res.data.errors);
      // console.log(res.data.errors);
    } else {
      if (
        res.data.message === "category updated." ||
        res.data.message === "category created."
      ) {
        navigate("/admin/categories");
      }
    }
    // console.log(res.data);
  };

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/categories").then((res) => {

  //     // console.log(res.data.categories);
  //   });
  //   if (id) {
  //     fetch(`http://127.0.0.1:8000/api/categories/${id}`)
  //       .then((response) => {
  //         if (response.status === 404) {
  //           navigate("/404");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // let categories = data.category;
  //         // // setCategoryName();
  //         // setName(categories.categoryName);
  //         console.log(data);
  //       });
  //   }
  // }, [id]);
  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {id ? "Edit" : "Create"} New Category
      </h1>
      <form onSubmit={handlesubmit} className="space-y-6">
        {/* product name */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            {id ? "Edit" : "Create"} Category name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 shadow-sm  "
          />

          {/* {error?categoryName === " " (
            <p className="text-red-500 text-sm my-2">{error.categoryName}</p>:""
          )} */}
          {error?.name && (
            <p className="text-red-500 text-sm my-2">{error.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="p-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          {id ? "Edit" : "Create"} gategory
        </button>
      </form>
    </div>
  );
}
export default AdminCategoriesform;
