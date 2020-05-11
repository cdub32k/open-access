import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { STRIPE_PK } from "../constants";
const stripePromise = loadStripe(STRIPE_PK);

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
