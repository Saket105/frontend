import "./App.css";
import React from "react";
import logo from "./logo.svg";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

function App() {
  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch("http://localhost:5000/payment", {
      method: "post",
      body: JSON.stringify(body),
      headers,
    })
      .then((response) => {
        console.log("Response ", response);
        const { status } = response;
        console.log("status", status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
        */}
        <StripeCheckout
          stripeKey="pk_test_51KmYnpSGNHOuvtTimyuodCuOwS7TwjZVr6XeW5ELrq4Tpzsz0e3rNlprxLvUeUEbPBspXXyHegYqiyTNHrWBWKKQ00AsLnQnBt"
          token={makePayment}
          name="Buy React"
          amout={product.price * 100}
        >
          <button className="btn-large red">Buy Product</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
