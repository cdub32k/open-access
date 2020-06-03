import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Grid from "@material-ui/core/Grid";
import CheckoutForm from "./CheckoutForm";
import { STRIPE_PK } from "../constants";
const stripePromise = loadStripe(STRIPE_PK);

import axios from "axios";

import CustomButton from "./CustomButton";

const Payment = ({ loadPaymentInfo }) => {
  const cancelSubscription = () => {};

  useEffect(() => {
    loadPaymentInfo();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomButton onClick={cancelSubscription} text="Cancel Subscription" />
      </Grid>
      <Grid item xs={12}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadPaymentInfo: () => dispatch(ActionCreators.loadUserPaymentInfoStart()),
});

const mapStateToProps = (state) => ({
  charges: state.user.payment.charges,
  subscriptions: state.user.payment.subscriptions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
