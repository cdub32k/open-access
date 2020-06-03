import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckoutForm from "./CheckoutForm";
import { STRIPE_PK } from "../constants";
const stripePromise = loadStripe(STRIPE_PK);

import axios from "axios";

import CustomButton from "./CustomButton";

import { date2str } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  charge: {},
  sub: {
    "& .subCaption": {
      display: "inline-block",
      color: theme.palette.secondary.main,
      "& span": {
        color: theme.palette.alert.main,
        textDecoration: "underline",
      },
    },
  },
  newPayment: {
    marginTop: 36,
  },
}));

const Payment = ({
  loadPaymentInfo,
  charges,
  subscriptions,
  active,
  activeUntil,
}) => {
  const classes = useStyles();

  const cancelSubscription = () => {
    axios.delete("/payment/subscription").then((res) => {
      if (res.data) console.log("unsubscribed!!!!!!!!!");
    });
  };

  useEffect(() => {
    loadPaymentInfo();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        {active && activeUntil && (
          <Typography variant="h5">
            Account will be active until {date2str(activeUntil)}
          </Typography>
        )}
        {active && !activeUntil && (
          <Typography variant="h5">Thank you loyal subscriber</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Charges
        </Typography>
        {charges.map((charge, i) => {
          return (
            <div key={i} className={classes.charge}>
              ${charge.amount} on {date2str(charge.createdAt)}
            </div>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Subscriptions
        </Typography>
        {subscriptions.map((sub, i) => {
          return (
            <div key={i} className={classes.sub}>
              ${sub.amount} on {date2str(sub.createdAt)}{" "}
              {!sub.terminated && (
                <Typography variant="subtitle2" className="subCaption">
                  ACTIVE <button onClick={cancelSubscription}>cancel</button>
                </Typography>
              )}
              {sub.terminated && (
                <Typography variant="subtitle2" className="subCaption">
                  terminated on {date2str(sub.terminatedAt)}
                </Typography>
              )}
            </div>
          );
        })}
      </Grid>
      {activeUntil && (
        <Grid className={classes.newPayment} item xs={12}>
          <Typography variant="h5">
            Make a new payment (1 month or subsribe)
          </Typography>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Grid>
      )}
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadPaymentInfo: () => dispatch(ActionCreators.loadUserPaymentInfoStart()),
});

const mapStateToProps = (state) => ({
  active: state.user.active,
  activeUntil: state.user.activeUntil,
  charges: state.user.payment.charges,
  subscriptions: state.user.payment.subscriptions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
