import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../muiTheme";
import { Provider, connect } from "react-redux";
import store from "../store";
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

import AuthRedirect from "./AuthRedirect";
import UnauthRedirect from "./UnauthRedirect";
import Payment from "./Payment";
import Login from "./Login";

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

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/payment">Access</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/login">
              <AuthRedirect component={Login} />
            </Route>
            <Route path="/payment">
              <Payment />
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