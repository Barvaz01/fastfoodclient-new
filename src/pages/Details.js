import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Details({ myOrder, setUserPhone }) {
  const navigate = useNavigate();
  const MoveToEnd = () => {
    if (detailsForm.first_name !== "") {
      if (detailsForm.last_name !== "") {
        if (detailsForm.address !== "") {
          if (detailsForm.phone !== "") {
            fetch("http://127.0.0.1:8000/api/orders/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(detailsForm),
            })
              .then((res) => res.json())
              .then((data) => console.log(data));
            setUserPhone(detailsForm.phone);
            navigate("../end");
          } else {
            window.alert("Must Complete All Fields");
          }
        } else {
          window.alert("Must Complete All Fields");
        }
      } else {
        window.alert("Must Complete All Fields");
      }
    } else {
      window.alert("Must Complete All Fields");
    }
  };

  const [detailsForm, setDetailsForm] = useState({
    dishes: myOrder,
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
  });

  const handleForm = (event) => {
    setDetailsForm((prevForm) => {
      return { ...prevForm, [event.target.name]: event.target.value };
    });
  };

  return (
    <div class="container-fluid" id="showBackground">
      <div
        class="card"
        style={{
          maxWidth: "70vh",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div class="card-body">
          <form
            style={{
              maxWidth: "70vh",
              textAlign: "center",
              fontWeight: "bold",
            }}
            class="row g-3"
          >
            <h2 style={{ color: "Red" }}>Please Complete Details</h2>
            <div class="col-md-6">
              <label for="inputFirstName" class="form-label">
                First Name
              </label>
              <input
                name="first_name"
                onChange={handleForm}
                type="text"
                class="form-control"
                id="FirstName"
                placeholder="first Name"
              />
            </div>
            <div class="col-md-6">
              <label for="inputLastName" class="form-label">
                Last Name
              </label>
              <input
                name="last_name"
                onChange={handleForm}
                type="text"
                class="form-control"
                id="LastName"
                placeholder="Last Name"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Address</label>
              <input
                name="address"
                onChange={handleForm}
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Address"
              />
            </div>
            <div class="col-12">
              <label class="form-label">Phone</label>
              <input
                name="phone"
                onChange={handleForm}
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder="Phone Number"
              />
            </div>
            <button
              type="button"
              id="MoveToEnd"
              class="btn btn-primary"
              onClick={MoveToEnd}
            >
              סיום והזמנה
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Details;
