import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_orders/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("Orders fetched:", res);
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "completed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 py-8">
        <div className="max-w-7xl  h-screen mx-auto  px-4 sm:px-6 lg:px-8  rounded-lg ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 ">
            Order History
          </h1>

          <div className="space-y-6">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-600">
                          Order ID: #{order.id}
                        </p>
                        <p className="text-sm text-gray-600">
                          Created: {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-md font-semibold${getStatusColor(
                            order.status
                          )}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <hr />

                    <ul className="space-y-2 ">
                      {order.products.map((product) => (
                        <>
                          <li key={product.id} className="text-sm">
                            <div className="flex  items-center justify-between">
                              {" "}
                              <div>
                                <strong>{product.name}</strong>:
                                {/* <p className="text-gray-600">
                                {product.description}
                              </p> */}
                                <p className="text-gray-600">
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                              <div className="">
                                <strong>${product.price}</strong>
                              </div>
                            </div>
                          </li>
                        </>
                      ))}
                    </ul>

                    <hr />

                    <p className="text-sm flex items-center justify-between">
                      <strong>Address:</strong>
                      <p>{order.address}</p>
                    </p>
                    <p className="text-sm flex items-center justify-between">
                      <strong>Notes:</strong>{" "}
                      <p>{order.notes || "No notes provided"}</p>
                    </p>
                    <p className="text-sm  flex items-center justify-between">
                      <strong> Total Amount:</strong>
                      <p className="font-semibold"> ${order.total_amount}</p>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
