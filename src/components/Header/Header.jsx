import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

function Header() {
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const loggedInUser = localStorage.getItem("loggedInUser");

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="navbar fixed-top bg-white border-bottom">
      <div className="container-fluid px-5 d-flex align-items-center justify-content-between">
        <Link
          to="/"
          className="navbar-brand mt-2"
          style={{ cursor: "pointer" }}
        >
          <h3 style={{ fontWeight: "bold" }}>Bobs Best Clothes</h3>
        </Link>

        <div className="d-flex align-items-center">
          <div className="me-4" style={{ position: "relative" }}>
            <Link to="/cart" style={{ color: "inherit" }}>
              <MdOutlineShoppingBag
                style={{ fontSize: "25", cursor: "pointer" }}
              />
              {totalQuantity > 0 && (
                <span
                  className="badge rounded-pill bg-primary"
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "4px",
                    transform: "translate(50%, -50%)",
                    fontSize: "12px",
                  }}
                >
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {loggedInUser ? (
            <div className="d-flex align-items-center">
              <Link to="/profile" style={{ color: "inherit" }}>
                <FaRegUser
                  className="me-4"
                  style={{ fontSize: "20", cursor: "pointer" }}
                />
              </Link>
              <button className="btn btn-dark" onClick={logOut}>
                Log out
              </button>
            </div>
          ) : (
            <Link to="/authentication" style={{ color: "inherit" }}>
              <button className="me-4 btn btn-dark">Sign in</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
