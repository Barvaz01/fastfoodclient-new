import React, { useEffect, useState } from "react";
import "./NewOrder.css";
import { useNavigate } from "react-router-dom";

function Neworder({ addToCard, total, myOrder }) {
  const navigate = useNavigate();
  const moveToShowOrder = () => {
    if (myOrder.length === 0) {
      window.alert("Shopping Card Is Empty");
    } else {
      navigate("../show");
    }
  };

  const entireCard = (dish_id) => {
    fetch(`http://127.0.0.1:8000/api/dish/${dish_id}`)
      .then((res) => res.json())
      .then((data) => addToCard(data));
  };

  const [dishes, setDishes] = useState([]);

  const [searchDish, setSearchDish] = useState("");

  const findDish = () => {
    fetch(`http://127.0.0.1:8000/api/dish/?search=${searchDish}`)
      .then((res) => res.json())
      .then((data) => setDishes(data));
  };

  const [categories, setCategories] = useState([]);
  const getSingleCategory = (category_id) => {
    fetch(`http://127.0.0.1:8000/api/dish/?category=${category_id}`)
      .then((res) => res.json())
      .then((data) => setDishes(data));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data));
    fetch("http://127.0.0.1:8000/api/dish/")
      .then((res) => res.json())
      .then((data) => setDishes(data));
  }, []);

  return (
    <div class="container-fluid" id="mainBackground">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-brand" style={{ fontWeight: "bold" }}>
            Fastfood
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map((cate) => {
                return (
                  <li class="nav-item" key={cate.id}>
                    <button
                      class="btn"
                      onClick={() => getSingleCategory(cate.id)}
                      style={{ color: "blue" }}
                    >
                      {cate.name}
                      <span> </span>
                      <img
                        src={cate.imageUrl}
                        alt="..."
                        style={{ maxHeight: "40px", borderRadius: "20px" }}
                      />
                    </button>
                  </li>
                );
              })}

              <li class="nav-item" style={{}}>
                <span
                  class="btn"
                  style={{
                    marginLeft: "40px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Order Sum: {total} ₪
                </span>
              </li>
              <li class="nav-item">
                <button
                  class="btn-btn-light"
                  style={{
                    marginLeft: "40px",
                    backgroundColor: "Highlight",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  onClick={moveToShowOrder}
                >
                  אישור הזמנה
                </button>
              </li>
            </ul>
            <div class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearchDish(e.target.value)}
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                onClick={findDish}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Card */}
      <div class="row">
        {dishes.map((dish) => {
          return (
            <div
              class="card"
              key={dish.id}
              style={{ width: "18rem", marginLeft: "12px", marginTop: "10px" }}
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
                <button
                  class="btn btn-primary"
                  onClick={() => entireCard(dish.id)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Neworder;
