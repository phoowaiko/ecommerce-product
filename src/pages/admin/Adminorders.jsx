import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Adminorders() {
  let [orders, setOrders] = useState([]);
  let [deleteOpenModel, setdeleteOpenModel] = useState(false);
  const [Id, setId] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOrders(res.data.orders);
        // console.log(res.data.orders);
        // console.log(res.data);
      });
  }, []);

  const deleteorder = () => {
    if (!Id) return;
    axios
      .delete("http://127.0.0.1:8000/api/orders/" + Id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setdeleteOpenModel(false);
        setId(null);
      });
    const newOrders = orders.filter((order) => order.id !== Id);
    setOrders(newOrders);
  };
  return (
    <div class="w-full">
      <div
        class={`absolute w-full h-full ${
          deleteOpenModel ? "flex" : "hidden"
        } bg-black/20 top-0 left-0  items-center justify-center`}
      >
        <div class="w-[600px] h-[300px] bg-white rounded-lg flex items-center justify-center flex-col gap-2">
          <h1 class="text-2xl font-bold">Are you sure to delete this order?</h1>
          <p>This action can't be undo</p>
          <div class="flex items-center mt-4 gap-3">
            <button
              onClick={() => {
                setdeleteOpenModel(false);
                setId(null);
              }}
              class="px-8 py-3 rounded-md  cursor-pointer border-[1px] border-black"
            >
              Cancel
            </button>
            <button
              onClick={deleteorder}
              class="px-8 py-3 rounded-md bg-red-500 cursor-pointer text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto  shadow">
        <table class="min-w-full divide-y divide-gray-200 bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ORDER ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                CUSTOMER
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                STATUS
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                TOTAL AMOUNT
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ADRESS
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
            {orders.map((order) => (
              <tr key={order.id} class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.id}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {order.user.name}
                </td>
                <td class="px-6 py-4 text-sm">
                  <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    {order.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {order.total_amount}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{order.address}</td>
                <td class="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.updated_at).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 text-sm text-right">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </Link>
                  <br />

                  <button
                    type="submit"
                    onClick={() => {
                      setdeleteOpenModel(true);
                      setId(order.id);
                    }}
                    class="text-red-600 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* <!-- Add more rows as needed --> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adminorders;
