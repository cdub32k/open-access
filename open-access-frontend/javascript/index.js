import React, { Component } from "react";
import { render } from "react-dom";

import "../styles/styles.scss";

import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import middleware from "./middleware";
import { ActionCreators } from "./actions";

let store;
if (process.env.MODE == "development") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
  );
} else if (process.env.MODE == "production") {
  store = createStore(reducers, applyMiddleware(...middleware));
}

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

import Container from "./components/Container";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Container />
      </React.Fragment>
    );
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
