import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    paddingTop: theme.spacing(10),
    maxWidth: 400,
  },
  formControl: {
    margin: `${theme.spacing(1)}px 0`,
  },
  error: {
    position: "absolute",
    fontSize: "14px",
    top: 50,
    left: "50%",
    transform: "translateX(-50%)",
  },
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
      <Grid item xs={12} className="tac">
        <Typography variant="h5" color="primary">
          Sign in
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <form>
          <FormGroup>
            <Grid
              container
              justify="center"
              className={`${classes.formControl}`}
            >
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input onChange={updateCredentials} name="username" />
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              className={`${classes.formControl}`}
            >
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input onChange={updateCredentials} name="password" />
                  {/*<FormHelperText className="tar"><a href="#">forgot password?</a></FormHelperText>*/}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              className={`${classes.formControl}`}
            >
              <Grid className="tar" item xs={12}>
                <Button onClick={onSubmit} variant="contained" color="primary">
                  Login
                </Button>
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
