import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function End({ userPhone, blank }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const BackToMain = () => {
    blank();
    navigate("../");
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/orders/?phone=${userPhone}`)
      .then((res) => res.json())
      .then((data) => setOrders(data[data.length - 1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      class="container-fluid"
      id="showBackground"
      style={{ marginTop: "10px" }}
    >
      <div
        class="container"
        style={{ marginLeft: "600px", marginTop: "100px" }}
      >
        <div class="card" style={{ width: "22rem" }} id="endpage">
          <div class="card-body">
            <h4 class="card-title" style={{ color: "purple" }}>
              Your Order Number Is: {orders.id}
            </h4>
            <h6 class="card-title">Thank You</h6>
            <button
              id="BackToMain"
              class="btn btn-primary"
              onClick={BackToMain}
            >
              Place New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;
