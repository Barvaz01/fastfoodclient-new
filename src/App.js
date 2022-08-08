import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import End from "./pages/End";
import Main from "./pages/Main";
import ShowOrder from "./pages/ShowOrder";
import NewOrder from "./pages/NewOrder";
import Details from "./pages/Details";

function App() {
  const [myOrder, setMyOrder] = useState([]);
  const [myTotal, setMyTotal] = useState(0);
  const [finalOrderId, setFinalOrderId] = useState([]);
  const [userPhone, setUserPhone] = useState("");
  const blank = () => {
    setMyTotal(0);
    setMyOrder([]);
  };
  const addPhone = (phone) => {
    setUserPhone(phone);
  };

  const regret = (dish) => {
    setMyTotal((prevtotal) => {
      return prevtotal - dish.price;
    });

    setFinalOrderId((prevState) =>
      prevState.filter((dishId) => {
        return dishId !== dish.id;
      })
    );

    setMyOrder((prevState) =>
      prevState.filter((myOrder) => {
        return myOrder.key !== dish.key;
      })
    );
  };

  const addToCard = (dish) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function generateString(length) {
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    }
    let newDish = {
      key: generateString(8),
      id: dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      imageUrl: dish.imageUrl,
      isGlutenFree: dish.isGlutenFree,
      isVegeterian: dish.isVegeterian,
      category: dish.category,
    };
    setMyOrder((prevlist) => {
      return [...prevlist, newDish];
    });
    setMyTotal((prevtotal) => {
      return prevtotal + dish.price;
    });
    setFinalOrderId((prevlist) => {
      return [...prevlist, dish.id];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="show"
          element={
            <ShowOrder total={myTotal} myOrder={myOrder} regret={regret} />
          }
        />
        <Route
          path="end"
          element={<End userPhone={userPhone} blank={blank} />}
        />
        <Route
          path="details"
          element={<Details myOrder={finalOrderId} setUserPhone={addPhone} />}
        />
        <Route
          path="new"
          element={
            <NewOrder addToCard={addToCard} total={myTotal} myOrder={myOrder} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
