import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CartContext } from "../Contexts/CartContext";

function ProductDetail() {
  let { id } = useParams();

  const [product, setproduct] = useState(null);

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  let { cartItems, setCartItems } = useContext(CartContext);
  let addToCart = () => {
    console.log(cartItems);
    // console.log(product);
    let newItem = {
      ...product,
      quantity: quantity,
    };
    let existingItem = cartItems.find((item) => item.id === newItem.id);
    if (existingItem) {
      existingItem.quantity += quantity;
      setCartItems([...cartItems]);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      navigate("/Checkout");
      return;
    }
    let newCartItems = [...cartItems, newItem];
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    navigate("/Checkout");
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        if (response.status === 404) {
          navigate("/404");
        }
        return response.json();
      })
      .then((data) => {
        setproduct(data.product);
        // console.log(data.product);
      });
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        loading.........
      </div>
    );
  return (
    <div
      className="bg-white  flex justify-between shadow p-3 space-y-2 mx-auto"
      style={{
        display: "flex ",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="border-0 shadow  space-y-2 w-sm">
        {/* Product Image */}
        <img
          className="w-full  object-cover rounded-lg"
          src={
            product.images.length
              ? product.images[0].url
              : "https://static.vecteezy.com/system/resources/thumbnails/044/650/652/small/a-sparkling-diamond-engagement-ring-with-multiple-stones-on-a-silver-band-png.png"
          }
          alt={product?.image}
        />
      </div>

      <div className="ml-10 mb-60 w-1/3 p-3 space-y-2 rounded-xl">
        {/* Product Model */}
        <div className="inline-block">
          <h1
            style={{
              fontSize: "30px",
              color: "#007bff",
            }}>
            {product.name}
          </h1>

          <p
            style={{
              fontSize: "30px",
              color: "#333",
              fontWeight: "bold",
            }}>
            {product.category.name}
          </p>

          {/* Price and Discount */}
          <p
            style={{
              color: "#333",
              fontSize: "27px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}>
            <strong>${product.price}</strong>{" "}
          </p>
        </div>

        {/* Product Description (Short) */}
        <p
          style={{
            color: "#555",
            fontSize: "15px",
            textAlign: "left",
            marginBottom: "9px",
            overflow: "hidden",
            // textOverflow: "ellipsis",
          }}>
          {product.description}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* product - and + */}
          <div className="inline-block items-center rounded-2xl mt-1  border border-black">
            <button
              onClick={() => {
                if (quantity === 1) return;
                setQuantity((prev) => prev - 1);
              }}
              className="px-3 py-1 text-gray-700 ">
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 text-gray-700 ">
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            style={{
              padding: "10px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              width: "100px",
              transition: "background-color 0.3s ease",
            }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
