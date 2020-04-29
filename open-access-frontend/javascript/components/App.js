import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import * as jwt_decode from "jwt-decode";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../muiTheme";

import { Provider, connect } from "react-redux";
import store from "../store";
import { ActionCreators } from "../actions";
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token) => dispatch(ActionCreators.autoLogin(token)),
});
const initApp = () => {
  const token = localStorage.getItem("open-access-api-token");
  if (token) {
    let decodedToken = jwt_decode(token);
    let d = new Date(0);
    d.setUTCSeconds(decodedToken.exp);
    if (new Date() < d) store.dispatch(ActionCreators.autoLogin(decodedToken));
  }
};
initApp();

import AuthRedirect from "./AuthRedirect";
import UnauthRedirect from "./UnauthRedirect";
import Payment from "./Payment";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import SiteNav from "./SiteNav";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          <SiteNav />

          <Switch>
            <Route path="/login">
              <AuthRedirect component={Login} />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/sign-up">
              <AuthRedirect component={SignUp} />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
            <Route path="/video-player">
              <VideoPlayer />
            </Route>
            <Route path="/video-list">
              <VideoList />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
