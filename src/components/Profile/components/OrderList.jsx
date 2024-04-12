import { OrderContext } from "../../../App";
import { useEffect, useContext, useState } from "react";
import OrderItem from "./OrderItem";
import {useNavigate} from "react-router-dom";

function OrderList() {
  const { orders, setOrders } = useContext(OrderContext);
  const reverseOrders = [...orders].reverse();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const ordersPerPage = 3;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = reverseOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNavigate = () =>{
    navigate('/');
  }

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(loggedInUser.id);
    fetch(`http://localhost:4000/orders/${loggedInUser.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className="container p-4 rounded-3 col-md-8 col-11"
      style={{ background: "var(--product-item-background)" }}
    >
      <h3 className="text-uppercase fw-bold text-center pb-3">Your orders</h3>
      {orders.length === 0 ? (
        <div className="text-center">
          <p>You have no order yet!</p>
          <p>
            When you purchase a product, it will appear here! Ready to get
            started?
          </p>
          <button className="btn btn-dark" onClick={handleNavigate}>Start</button>
        </div>
      ) : (
        <>
          {currentOrders.map((order, index) => (
            <div key={index} className="row justify-content-center mb-4">
              <div className="col-md-10">
                <div className="border p-3 rounded-1">
                  <h5 className="fw-bold">Order Number: {order.id}</h5>
                  <OrderItem order={order} />
                  <p className="text-center" style={{ fontWeight: "bold" }}>
                    Total: {"$" + order.total}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {reverseOrders.length > ordersPerPage && (
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                {[
                  ...Array(
                    Math.ceil(reverseOrders.length / ordersPerPage)
                  ).keys(),
                ].map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${
                      currentPage === pageNumber + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(pageNumber + 1)}
                    >
                      {pageNumber + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

export default OrderList;
