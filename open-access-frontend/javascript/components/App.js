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
import Account from "./Account";
import Payment from "./Payment";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import SiteNav from "./SiteNav";
import Profile from "./Profile";
import NotePage from "./NotePage";
import NoteUploader from "./NoteUploader";
import NoteList from "./NoteList";
import VideoPage from "./VideoPage";
import VideoUploader from "./VideoUploader";
import VideoList from "./VideoList";
import ImagePage from "./ImagePage";
import ImageUploader from "./ImageUploader";
import ImageList from "./ImageList";

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
            <Route path="/logout" component={Logout} />
            <Route path="/sign-up">
              <AuthRedirect component={SignUp} />
            </Route>
            <Route path="/my-account" component={Account} />
            <Route path="/payment" component={Payment} />
            <Route path="/note/:noteId" component={NotePage} />
            <Route path="/note-list" component={NoteList} />
            <Route path="/note-upload" component={NoteUploader} />
            <Route path="/image/:imageId" component={ImagePage} />
            <Route path="/image-list" component={ImageList} />
            <Route path="/image-upload" component={ImageUploader} />
            <Route path="/video-player/:videoId" component={VideoPage} />
            <Route path="/video-list" component={VideoList} />
            <Route path="/video-upload" component={VideoUploader} />
            <Route path="/profile/:username" component={Profile} />
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Home} />
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
