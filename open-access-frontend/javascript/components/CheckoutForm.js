import React, { useState } from "react";
import { connect } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

import CardSection from "./CardSection";

const CheckoutForm = ({ email }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
      },
    });

    if (result.error) {
    } else {
      axios
        .post("payment/process-payment", {
          payment_method: result.paymentMethod.id,
          subscribed,
        })
        .then((res) => {});
    }
  };

  return (
    <div style={{ width: 425 }}>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={subscribed}
                onChange={() => setSubscribed(!subscribed)}
                name="subscribe"
                color="primary"
              />
            }
            label="Renew every month"
          />
        </FormGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe}
        >
          Confirm order
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(CheckoutForm);
