import { useContext, useMemo, useState } from "react";
import { CartContext } from "../Contexts/CartContext";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const checkoutSchema = z.object({
  shipping_address: z
    .string()
    .min(10, "Must be at least 10")
    .max(120, "Shout not be greater than 120"),
  notes: z.string(),
  screen_shot: z.instanceof(File),
});
function Checkout() {
  let { cartItems, setCartItems } = useContext(CartContext);
  let [total, setTotal] = useState(0);
  let [order_products, setOrderProducts] = useState([]);

  let navigate = useNavigate();

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  let createOrder = async (data) => {
    try {
      let order = {
        shipping_address: data.shipping_address,
        screen_shot: data.screen_shot,
        notes: data.notes,
        order_products,
        total_amount: total,
      };
      let res = await axios.post("http://127.0.0.1:8000/api/orders", order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.message === "order create successful.") {
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));
        navigate("/orders");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  let removeItem = (item) => {
    let newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  total = useMemo(() => {
    let _total = 0;
    if (cartItems.length) {
      cartItems.forEach((item) => {
        _total += item.price * item.quantity;
      });
      setTotal(_total);
      setOrderProducts(
        cartItems.map((item) => {
          return {
            product_id: item.id,
            quantity: item.quantity,
          };
        })
      );
    } else {
      // setTotal(0);
      _total = 0;
    }
    return _total;
  }, [cartItems]);

  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-2 bg-gray-100 gap-6 p-6 mx-auto">
      {/* Product Section */}
      <div className=" px-2 w-full space-y-4 ml-26  ">
        <h1 className="text-4xl font-bold">Checkout</h1>

        {cartItems.length === 0 ? (
          <body className="bg-gray-50 flex items-center justify-center h-screen">
            <div className="max-w-md w-full text-center p-8 bg-white shadow-xl rounded-2xl">
              <img
                src="data:image/png;base64,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"
                alt="Empty Cart"
                className="mx-auto h-40 mb-6 "
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mb-6">
                We could not find any items in your cart. Maybe you have not
                added anything yet?
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
                  Continue Shopping
                </a>
                <a href="/" className="text-blue-600 hover:underline">
                  Return Home
                </a>
              </div>
            </div>
          </body>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
              <Link to={`/products/${item.id}`}>
                <img
                  // src={item.images[0]?.url}
                  src={
                    item.images.length
                      ? item.images[0]?.url
                      : "https://static.vecteezy.com/system/resources/thumbnails/044/650/652/small/a-sparkling-diamond-engagement-ring-with-multiple-stones-on-a-silver-band-png.png"
                  }
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              </Link>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
              </div>
              <div>
                <p className="text-sm font-semibold mt-1">
                  ${item.price} * {item.quantity} = $
                  {item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item)}
                  className="mt-2 text-red-500 border-red-300 hover:bg-red-50">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit(createOrder)}
        className="px-2 max-w-sm space-y-3 mt-14 ml-35">
        {/* Shipping Information */}
        <div className=" bg-white rounded-xl shadow-sm p-3 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Shipping Information
          </h2>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1 ">
              shipping address
            </label>
            <textarea
              rows="4"
              className="w-full rounded-xl border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="enter your shipping address"
              {...register("shipping_address")}></textarea>
            {formState.errors.shipping_address && (
              <p className="text-red-500">
                {formState.errors.shipping_address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-1">
              Order Note(optional)
            </label>
            <textarea
              rows="4"
              className="w-full rounded-xl border border-gray-300 px-4 py-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="enter your order note"
              {...register("notes")}></textarea>
          </div>

          {/* <!-- Screenshot Upload --> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              payment Screenshot (optional)
            </label>
            <input
              id="screen_shot"
              type="file"
              accept="image/*"
              name="screen_shot"
              onChange={(e) => setValue("screen_shot", e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {formState.errors.screen_shot && (
              <p className="text-red-500">
                {formState.errors.screen_shot.message}
              </p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm space-y-4">
          <div className=" p-3 space-y-2">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>

            <div className="flex justify-between border-t pt-1.5 border-gray-300 font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button
              type="submit"
              className="bg-blue-600  w-full mt-4 p-2  text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Proceed to Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
