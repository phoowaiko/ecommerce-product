import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Adminproducts() {
  let [products, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data.products);
        // console.log(res.data.products);
      });
  }, []);

  const handleDelete = async (id) => {
    let res = await axios.delete("http://127.0.0.1:8000/api/products/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.message === "product delete successful") {
      setProduct(products.filter((product) => product.id !== id));
    }
  };
  return (
    <>
      <div className="flex justify-end">
        <Link
          to={"/admin/products/create"}
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
                  PRODUCT ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  IMAGE
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  NAME
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  DESCRIPTION
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  TOTAL AMOUNT
                </th>

                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  DATE
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.id}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    <img
                      src={
                        product.images.length
                          ? product.images[0].url
                          : "https://static.vecteezy.com/system/resources/thumbnails/044/650/652/small/a-sparkling-diamond-engagement-ring-with-multiple-stones-on-a-silver-band-png.png"
                      }
                      // alt={product.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <span class="inline-flex items-center  px-2 py-1 text-xs font-medium rounded-lg  bg-green-100">
                      {product.description}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {product.price}
                  </td>

                  <td class="px-6 py-4 text-sm text-gray-500">
                    {new Date(product.updated_at).toLocaleDateString()}
                  </td>

                  <td class="px-6 py-4 text-sm text-right">
                    <Link
                      to={"/admin/products/" + product.id + "/edit"}
                      type="submit"
                      class="text-yellow-600
                      hover:text-yellow-600"
                    >
                      Edit
                    </Link>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete(product.id);
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

              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Adminproducts;
