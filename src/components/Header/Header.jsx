import { useContext } from "react";
import { MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../App";

function Header() {
  const {cart} = useContext(CartContext);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity,0);
  const loggedInUser = localStorage.getItem("loggedInUser")


  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  } 

  return (
    <nav className=" navbar fixed-top bg-white border-bottom">
      <div className="container-fluid px-5">
        <Link to="/" className="navbar-brand" style={{ cursor: "pointer" }}>
         <h3 style={{fontWeight:"bold"}}> Bobs Best Clothes</h3>
        </Link>
        <div className="d-flex">
          
          {(loggedInUser) 
          ?
          <div>
            <Link to="/profile" style={{color:'inherit'}}>
            <FaUserCircle
              className="me-5"
              style={{ fontSize: "25", cursor: "pointer" }}
            />
            </Link>
            <strong className="me-5" onClick={logOut} style={{cursor: 'pointer'}}>Log out</strong>
          </div>  
          :
            <Link to="/authentication" style={{color:'inherit'}}>
            <FaUserLock
              className="me-5"
              style={{ fontSize: "25", cursor: "pointer" }}
            />
            </Link>
        }
          <div style={{position:"relative"}}>
          <Link to="/cart" style={{color:'inherit'}}>
            <MdShoppingCart style={{ fontSize: "25", cursor: "pointer" }} />
            {totalQuantity > 0 && (
              <span
                className="badge rounded-pill bg-primary"
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "4px",
                  transform:"translate(50%, -50%)",
                  fontSize: "12px",
                }}
              >
                {totalQuantity}
              </span>
            )}
          </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;
