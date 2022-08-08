import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const moveToNewOrder = () => {
    navigate("new");
  };
  return (
    <div class="container-fluid" id="main">
      <h1 id="welcome">Welcome</h1>
      <button class="btn btn-primary" onClick={moveToNewOrder}>
        Order now
      </button>
    </div>
  );
}

export default Main;
