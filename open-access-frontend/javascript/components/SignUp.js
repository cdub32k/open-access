import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingTop: theme.spacing(2),
    maxWidth: 400,
  },
  error: {
    position: "absolute",
    fontSize: "14px",
    top: 50,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const SignUp = ({ error, signupStart }) => {
  const classes = useStyles();

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

  const onSubmit = (e) => {
    e.preventDefault();
    signupStart({ email, username, password });
  };

  return (
    <Grid className={classes.container} container justify="center">
      <Grid item xs={12} style={{ marginBottom: 18 }}>
        <Typography variant="h3" color="primary">
          Sign up
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={onSubmit}>
          <FormGroup>
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
            <Grid container justify="center" className="mt3">
              <Grid item xs={12}>
                <CustomButton text="Sign up" onClick={onSubmit} />
              </Grid>
            </Grid>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  signupStart: (userInfo) => dispatch(ActionCreators.signupStart(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
