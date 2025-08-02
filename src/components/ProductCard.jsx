import { Link } from "react-router";

function Productcard({ product }) {
  return (
    <Link to={"/products/" + product.id}>
      <div
        className="text-left inline-block ml-[34px] p-4 max-w-[300px] border border-[#ddd] rounded shadow  hover:shadow-lg transition duration-300"
        // style={{
        //   display: "inline-block",
        //   textAlign: "justify",
        //   marginLeft: "34px",
        //   fontFamily: "Arial, sans-serif",
        //   padding: "16px",
        //   maxWidth: "300px",
        //   border: "1px solid #ddd",
        //   // backgroundColor: "white",
        //   borderRadius: "8px",
        //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        //   overflow: "hidden",
        // }}
      >
        {/* Product Image */}
        <div className="relative h-64">
          <img
            src={
              product.images.length
                ? product.images[0].url
                : "https://static.vecteezy.com/system/resources/thumbnails/044/650/652/small/a-sparkling-diamond-engagement-ring-with-multiple-stones-on-a-silver-band-png.png"
            }
            alt="Backpack"
            className="w-full h-full object-contain p-4"
          />
        </div>
        {/* Product Name */}
        <div>
          {/* <p
            style={{
              fontSize: "13px",
              color: "#007bff",
            }}
          >
            {product.name}
          </p>
           */}
          <p
            style={{
              fontSize: "15px",
              color: "#333",
              fontWeight: "bold",
            }}>
            {/* {product.category.name} */}
          </p>
        </div>

        {/* Product Title */}
        {/* <h4
          style={{
            color: "#333",
            fontSize: "15px",
            fontWeight: "bold",
            marginBottom: "5px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </h4> */}

        {/* Product Description (Short) */}
        <p
          style={{
            color: "#555",
            fontSize: "12px",
            lineHeight: "1.5",
            height: "60px",
            overflow: "hidden",
          }}>
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
          }}>
          {/* Price and  */}
          <p
            style={{
              color: "#333",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "5px",
            }}>
            <strong>${product.price}</strong>
            {""}
            {/* <span style={{ color: "#f00", fontSize: "12px" }}>
              {product.discount} {product.discount > 1 ? "- %" : " "}
            </span> */}
          </p>
          {/* Buy Now Button */}
        </div>
      </div>
    </Link>
  );
}
export default Productcard;
