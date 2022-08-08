import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShowOrder.css";

function ShowOrder({ total, myOrder, regret }) {
  const navigate = useNavigate();
  const moveToDetails = () => {
    navigate("../details");
  };
  console.log(myOrder);
  const moveBack = () => {
    navigate("../new");
  };
  return (
    <div
      class="container-fluid"
      id="showBackground"
      style={{ backgroundColor: "lightblue", marginTop: "10px" }}
    >
      <div>
        <div class="row">
          {myOrder.map((dish) => {
            return (
              <div
                class="card"
                key={dish.key}
                style={{
                  width: "18rem",
                  marginLeft: "12px",
                  marginTop: "10px",
                }}
              >
                <img
                  style={{ height: "200px", maxWidth: "18rem" }}
                  src={dish.imageUrl}
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5
                    class="card-title"
                    style={{ color: "gold", fontStyle: "oblique" }}
                  >
                    {dish.name}
                  </h5>
                  <p class="card-text">{dish.description}</p>
                  <p
                    class="card-text"
                    style={{ color: "brown", fontWeight: "bold" }}
                  >
                    {dish.isGlutenFree && "Gluten Free"}
                  </p>
                  <p
                    class="card-text"
                    style={{ color: "green", fontWeight: "bold" }}
                  >
                    {dish.isVegeterian && "Vegeterian"}
                  </p>
                  <p class="card-text">{dish.price + " ₪"}</p>
                  <button class="btn btn-danger" onClick={() => regret(dish)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* סיכום הזמנה  */}
      <div
        class="card-body"
        style={{
          maxWidth: "90vh",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10px",
          // backgroundColor: "yellow",
        }}
      ></div>
      <div
        class="card"
        style={{ maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}
      >
        <h5
          class="card-title"
          style={{ textAlign: "center", fontWeight: "bold" }}
        >
          Order summary
        </h5>
        <h6
          class="card-subtitle mb-2 text-muted"
          style={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          Total Order Sum: {total} ₪
        </h6>
        <div class="card-body">
          <button
            type="button"
            id="details"
            class="btn btn-success"
            onClick={moveToDetails}
          >
            Proceed Order
          </button>

          <button
            type="button"
            id="BackToNewOrder"
            class="btn btn-primary"
            onClick={moveBack}
          >
            Back
          </button>
        </div>
        <p class="card-text"></p>
      </div>
    </div>
  );
}

export default ShowOrder;
