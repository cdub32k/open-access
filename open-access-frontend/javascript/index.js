import React, { Component } from "react";
import { render } from "react-dom";

import "../styles/styles.scss";

import axios from "axios";
axios.defaults.baseURL = process.env.API_URL;

import App from "./components/App";

render(App, document.getElementById("root"));
