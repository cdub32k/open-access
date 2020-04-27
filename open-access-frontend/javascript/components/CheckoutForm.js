import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import CardSection from "./CardSection";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await axios("/payment/initiate").then(async (res) => {
      const result = await stripe.confirmCardPayment(res.data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      return result;
    });

    if (result.error) {
      //TODO: report error to customer
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status == "succeeded") {
        console.log("payment succeeded");
      }
    }
  };

  return (
    <div style={{ width: 425 }}>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe}>Confirm order</button>
      </form>
    </div>
  );
}

export default CheckoutForm;
