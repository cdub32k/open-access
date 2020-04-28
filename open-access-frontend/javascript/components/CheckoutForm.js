import React, { useState, useEffect } from "react";
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
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    axios.get("payment/intent").then((res) => {
      setClientSecret(res.data.client_secret);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (subscribed) {
      createSubscription();
    } else {
      makeOneTimePayment();
    }
  };

  const createSubscription = async () => {
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
      },
    });

    if (result.error) {
      // show error in payment form
    } else {
      axios
        .post("payment/create-subscription", {
          payment_method: result.paymentMethod.id,
        })
        .then((res) => {
          // customer has been created
          console.log(res.data);
        });
    }
  };

  const makeOneTimePayment = async () => {
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const { id, amount, payment_method, created } = result.paymentIntent;
        axios
          .post("/payment/save-charge", {
            stripePaymentIntentId: id,
            stripePaymentMethodId: payment_method,
            amount,
            createdAt: created,
          })
          .then((res) => {})
          .catch(console.error);
      }
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
