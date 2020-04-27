import React from "react";
import { connect } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import CardSection from "./CardSection";

function stripePaymentMethodHandler(result, email) {
  if (result.error) {
    // show error in payment form
  } else {
    axios
      .post("payment/create-customer", {
        payment_method: result.paymentMethod.id,
        email,
      })
      .then((res) => {
        // customer has been created
        console.log(res.data);
      });
  }
}

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: "member@mail.com",
      },
    });

    stripePaymentMethodHandler(result, props.email);
  };

  return (
    <div style={{ width: 425 }}>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe}>Confirm order</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(CheckoutForm);
