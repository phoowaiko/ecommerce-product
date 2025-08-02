import { useEffect, useState } from "react";
import Productcard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        return setProducts(data.products);
      });
  }, []);

  const filterproductbysearch = (search) => {
    if (!search) {
      fetch("http://127.0.0.1:8000/api/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
        });
    }

    let filterproduct = products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filterproduct);
  };
  return (
    <>
      {/* <Memoexample /> */}
      <h1 style={{ fontSize: "30px", fontWeight: "bold", margin: "20px" }}>
        Product Cards
      </h1>

      <Navbar filterproductbysearch={filterproductbysearch} />

      <div className="grid grid-cols-4 gap-y-5">
        {products.map((product) => (
          <Productcard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default App;
