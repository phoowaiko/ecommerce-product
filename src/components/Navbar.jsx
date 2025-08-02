import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { CartContext } from "../Contexts/CartContext";

function Navbar({ filterproductbysearch }) {
  let { users, logout } = useContext(AuthContext);
  // let [search, setsearch] = useState("");
  let { cartItems } = useContext(CartContext);

  // useEffect(() => {
  //   filterproductbysearch(search);
  // }, [search]);
  // console.log("navbar", users);

  return (
    <nav
      style={{
        backgroundColor: "darkblue",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* Logo */}
        <Link to={"/"} style={{ fontWeight: "bold" }}>
          <h1 style={{ color: "blueviolet", fontSize: "40px" }}>
            Clothing Store
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul
          style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
          <li style={{ margin: "0 15px" }}>
            <a
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}>
              Home
            </a>
          </li>
          <li style={{ margin: "0 15px" }}>
            <a
              href="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}>
              About
            </a>
          </li>
          <li style={{ margin: "0 15px" }}>
            <a
              href="#services"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "18px",
              }}>
              Services
            </a>
          </li>
        </ul>

        {/* Search Bar and Profile */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="px-4 bg-white flex items-center focus-within:outline focus-within:border focus:ring-2 focus:ring-blue-500  focus:border-white border-radius-3xl">
            {/* {search} */}
            <input
              // value={search}
              // onChange={(e) => setsearch(e.target.value)}
              type="text"
              placeholder="Search products...."
              style={{
                padding: "5px 6px",
                border: "5px solid white",

                marginRight: "20px",
                width: "350px",
                outline: "none",
              }}
            />
            {/* search icon */}
            <div className="m-1">
              <img
                width={20}
                height={20}
                src="data:image/png;base64,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 "
              />
            </div>
          </div>

          {/* Profile Section */}
          {!users && (
            <div className="flex items-center space-x-4">
              <Link to={"/login"} className="text-blue-200 hover:text-blue-600">
                Login
              </Link>
              <Link
                to={"/register"}
                className="text-blue-200 hover:text-blue-600">
                Register
              </Link>
            </div>
          )}

          {/* checkout icon */}
          <Link
            to={"/Checkout"}
            className="text-gray-600 hover:text-blue-600 relative m-2">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8AAAD6+vrt7e0pKSl1dXWWlpZ4eHjn5+fv7+/GxsbT09MtLS3i4uKXl5dra2sjIyM0NDQbGxuvr6+3t7c+Pj6mpqb19fU5OTlMTEzAwMAKCgrb29uLi4vExMSkpKRiYmJ/f39FRUVTU1P2Dp5PAAADo0lEQVR4nO3d61ajMBSG4VLEij3Y2pN2rKfe/z3OoGuWyx0KBHLYwPv8buL+CqUhTXAyAQAAAAAAAAAAAAAAAAAAA5SeVtnlT1L4c8lWpzR2QW6dZutEWs9OsctyZf5gpPvvYR67OAd2i6v5vo7kLnaBHe0eK/N9fSr7nPFlX5uvsH+JXWhb50b5CufYpbaS3jQOmCQ3PfzyuLfIV7iPXbCtg2XAJDnELtnOrXXAJLmNXbSNNgF7FdH+FP3WmxPV9iLzoyeXm7R1wCTpx5fGtYHo/nxapsfpMV2ezp9XXrOJXXwT5SOZxSH/9ar8UP5G9GB0syyre112K/hq3jP+swxesa2nkqrfrrz2reS1+6DVtrAza64Yc5aNXbXfTJkVv1e+/t1sEKTO1rZGvQ81Lcwpjm2QStsyzrr32ibGUbzxXmUHc1ntokEj42tD8/SUccrdNWh0Z3tiRzSVtTYbShsD9annOts7iUqbjsE2op3eqeJMVNr0VkHejGReq+xCDMPW/hsGJm+bmt/Qyk+i1puo19Z1yvdG652wmJ35tGgqJse1ztjM2pcp3pyZtxq7ETfurxZNxQluc/hDEldEm99bXn431XoxFb+kHS2aHn83ffRWYydyzGbVWLTVOW4jYSUSqkDCSiRUgYSVepGwZDa4tdhRSuUrhwlv8/o/GFg6qy/bSqbsPr/d0oRqmm6DUzkd6MZGzWE05vKdUTK/337pRT0VU1L+jmBBwVHssrakififRT8XmR9PsQO6/Jovt4obMPceMEniDm/kr00+RP0lyvdl5lvMi42PwZop5vDN3E3xMc+nXeTzD6PPiPPDxhq2TZOVCXXujC+geGvd5PogV2sn5aqceGuI5D2hiyNYkOtP4v3Y9uyrEPEl9OysY1vibHI3Shaj+WjrwOTkmrsJMn89a6mDhKGQUGPPWuogYSgk1NizljpIGAoJNfaspQ4ShkJCjT1rqYOEoZBQY89a6iBhKCTU2LOWOkgYCgk19qylDhKGQkKNPWupg4ShkFBjz1rqIGEoJNTYs5Y6SBgKCTX2rKUOEoYy/ITDX0ErV0G729yiZhX08Feyy90IC0efFz27EYa/o6R0V9BxSLuCRrCza/i784a/w3IEu2SHv9O5/CnzLkXfrT6CJw4M/6kRI3jyxwie3jKCJ/BMhv8UpckInoQ1KZ5mVv3fKm0sVvqeZvZluc0undNdsq3+/6YDAAAAAAAAAAAAAAAAAACu+AvQNypt0Ts7twAAAABJRU5ErkJggg=="
              width="60px"
              style={{
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bol rounded-full h-5 w-5 flex item-center justify-center">
                {cartItems?.length}
              </span>
            )}
          </Link>

          {!!users && (
            <>
              <Link
                to={"/profile"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  cursor: "pointer",
                }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvbNq2LBNwU__YfunpRuckZs6tVQsqA272jw&s"
                  width="60px"
                  alt=""
                  style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                />
              </Link>
              <button
                className="text-white bg-red-500 rounded-lg px-2 py-1 ml-4"
                onClick={logout}>
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
