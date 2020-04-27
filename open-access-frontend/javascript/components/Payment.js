import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_ymlirL5g1gzxXymKMoI5dUDH");

class Payment extends Component {
  state = {};

  render() {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  }
}

export default Payment;
