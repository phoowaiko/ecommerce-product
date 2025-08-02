import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setorderDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setorderDetail(res.data.order);
      });
  }, []);
  console.log(orderDetail);

  const confirmOrder = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/orders/${id}`,
        {
          status: "confirmed",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        navigate("/admin/orders");
      });
  };
  return (
    <div>
      {!orderDetail ? (
        <div className="flex items-center gap-2 w-full px-4 py-2 shadow-2xl text-white   bg-gray-900">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : (
        <div>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Order Details - #{orderDetail.id}
            </h1>

            {/* Status */}
            <div className="mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 ${
                  orderDetail.status == "pending"
                    ? " text-yellow-800 bg-yellow-100"
                    : "bg-green-100 text-green-600 "
                }rounded `}
              >
                {orderDetail.status}
              </span>
            </div>

            {/* Payment Screenshot */}
            <div className="mb-4">
              <strong>Payment Screenshot:</strong>
              <div className="mt-2">
                <img
                  src={orderDetail.screen_shot}
                  alt="Payment Screenshot"
                  className="w-full max-w-md rounded-lg border"
                />
              </div>
            </div>

            {/* Total */}
            <div className="mb-6">
              <strong>Total Amount:</strong>{" "}
              <span className="text-green-600 font-bold text-xl">
                ${orderDetail.total_amount || "0.00"}
              </span>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Products:</h2>
              <div className="space-y-4">
                {orderDetail.products.map((product, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-lg shadow-sm bg-gray-50"
                  >
                    <h3 className="text-lg font-medium">{product.name}</h3>

                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className=" text-gray-800 font-semibold ">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {orderDetail.status == "pending" && (
              <button
                onClick={() => confirmOrder()}
                className="bg-green-500 text-lg px-3 py-2 rounded-lg mt-4 "
              >
                Confirmed Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
