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
  btn: {
    marginTop: 12,
  },
  ...theme.globalClasses,
}));

const Login = ({ error, loginStart }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const updateCredentials = (e) => {
    switch (e.target.name) {
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
    loginStart({ username, password });
  };

  return (
    <Grid className={classes.container} container justify="center">
      {error && (
        <Typography className={classes.error} variant="caption" color="error">
          User not found!
        </Typography>
      )}
      <Grid item xs={12} style={{ marginBottom: 12 }}>
        <Typography variant="h3" color="primary">
          Sign in
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <FormGroup>
            <Grid container justify="center">
              <Grid className={classes.inputContainer} item xs={12}>
                <CustomInput
                  name="username"
                  label="Username"
                  onChange={updateCredentials}
                />
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid className={classes.inputContainer} item xs={12}>
                <CustomInput
                  name="password"
                  label="Password"
                  onChange={updateCredentials}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" className={classes.btn}>
              <Grid style={{ textAlign: "right" }} item xs={12}>
                <CustomButton
                  text="Sign in"
                  disabled={!username || !password}
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

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginStart: (credentials) => dispatch(ActionCreators.loginStart(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
