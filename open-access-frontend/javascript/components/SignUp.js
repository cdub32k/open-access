import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import {
  useStripe,
  useElements,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK } from "../constants";
const stripePromise = loadStripe(STRIPE_PK);

import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CardSection from "./CardSection";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingTop: theme.spacing(2),
    maxWidth: 400,
  },
  section: {
    margin: `${theme.spacing(2)}px 0 0 0`,
  },
  btn: {
    marginTop: 18,
  },
  error: {
    position: "absolute",
    fontSize: "14px",
    top: 50,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const SignUp = ({ error, signupStart, ...rest }) => {
  console.log("@@@@@@@@@@@@@@@@@@@", rest);
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateCredentials = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value.toLowerCase());
        break;
      case "username":
        setUsername(e.target.value.toLowerCase());
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
      signupStart({
        email,
        username,
        password,
        payment_method: result.paymentMethod.id,
        subscribed,
      });
    }
  };

  return (
    <Grid className={classes.container} container justify="center">
      <Grid item xs={12}>
        <Typography variant="h3" color="primary">
          Sign up
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <div className={classes.section}>
              <Typography variant="h6" color="primary">
                User Info
              </Typography>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <CustomInput
                    value={email}
                    name="email"
                    label="Email"
                    onChange={updateCredentials}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <CustomInput
                    value={username}
                    name="username"
                    label="Username"
                    onChange={updateCredentials}
                  />
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <CustomInput
                    value={password}
                    name="password"
                    label="Password"
                    onChange={updateCredentials}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid container justify="center">
              <Grid item xs={12}>
                <CardSection />
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.btn}>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <CustomButton
                  text="Sign up"
                  disabled={!email || !username || !password}
                  onClick={onSubmit}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};

const SignUpContainer = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <SignUp {...props} />
    </Elements>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  signupStart: (userInfo) => dispatch(ActionCreators.signupStart(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
