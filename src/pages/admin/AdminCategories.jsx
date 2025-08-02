import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

function AdminCategories() {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.categories);
        setCategories(res.data.categories);
      });
  }, []);

  const handleDelete = async (id) => {
    let res = await axios.delete(
      "http://127.0.0.1:8000/api/categories/" + id,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(res.data.message);
    // console.log(res.data);
    if (res.data.message === "delete successful.") {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };
  return (
    <>
      <div className="flex justify-end">
        <Link
          to={"/admin/categories/create"}
          className=" bg-blue-700 px-4 py-2 rounded-lg text-white my-3"
        >
          create
        </Link>
      </div>
      <div class="w-full">
        <div class="overflow-x-auto  shadow">
          <table class="min-w-full divide-y divide-gray-200 bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Categories ID
                </th>

                <th class="px-3 py-1 me-96 text-left text-xs font-medium text-gray-500 uppercase">
                  NAME
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  DATE
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category.id} class="hover:bg-gray-50">
                  <td class="px-7 py-5 mr-1.5 whitespace-nowrap text-sm text-gray-900">
                    {category.id}
                  </td>

                  <td class="inline-flex items-center mt-5 px-2 py-1 text-xs font-medium rounded-lg  bg-green-100">
                    {category.name}
                  </td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    {new Date(category.updated_at).toLocaleDateString()}
                  </td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    <Link
                      to={"/admin/categories/" + category.id + "/edit"}
                      class="text-yellow-300 hover:text-yellow-300"
                    >
                      Edit
                    </Link>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete(category.id);
                      }}
                    >
                      <button
                        type="submit"
                        class="text-red-600 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
