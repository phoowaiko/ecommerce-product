import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function Adminproductsform() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  let [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
      category_id: categoryID,
      description,
    };

    let res;
    if (id) {
      res = await axios.put(
        "http://127.0.0.1:8000/api/products/" + id,
        product,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res.data);
    } else {
      res = await axios.post("http://127.0.0.1:8000/api/products", product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

    if (res.data.errors) {
      // console.log(res.data.errors);
      setError(res.data.errors);
    } else {
      if (
        res.data.message === "product created successful." ||
        res.data.message === "product update successful."
      ) {
        navigate("/admin/products");
      }
    }
  };

  // product call
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
      // console.log(res.data.categories);
      setCategories(res.data.categories);
      // console.log(res.data.categories);
    });
    if (id) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then((response) => {
          if (response.status === 404) {
            navigate("/404");
          }
          return response.json();
        })
        .then((data) => {
          let product = data.product;
          // console.log(product);
          setName(product.name);
          setPrice(product.price);
          setCategoryID(product.category_id);
          setDescription(product.description);
        });
    }
  }, [id]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {id ? "Edit" : "Create"} Product
      </h1>
      <form onSubmit={handlesubmit} className="space-y-6">
        {/* product name */}
        <div>
          <label className="block text-sm  text-gray-700 mb-1">
            {id ? "Edit" : "Create"} Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 outline-none rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {error?.name && (
            <p className="text-red-500 text-sm my-2">{error.name}</p>
          )}
        </div>

        {/* product price */}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            placeholder="$"
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 outline-none rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {error?.price && (
            <p className="text-red-500 text-sm my-2">{error.price}</p>
          )}
        </div>

        {/* product category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full p-3 shadow-sm outline-none rounded-lg focus:ring-2 focus:ring-blue-400"
            id="categoryID"
            name="categoryID"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((categorey) => (
              <option key={categorey.id} value={categorey.id}>
                {categorey.name}
              </option>
            ))}
          </select>
          {error?.category_id && (
            <p className="text-red-500 text-sm my-2">{error.category_id}</p>
          )}
        </div>

        {/* product description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 outline-none  focus:ring-2 focus:ring-blue-400 rounded-lg shadow-sm "
          ></textarea>
          {error?.description && (
            <p className="text-red-500 text-sm my-2">{error.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="p-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          {id ? "Edit" : "Create"} Product
        </button>
      </form>
    </div>
  );
}

export default Adminproductsform;
