import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import * as jwt_decode from "jwt-decode";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../muiTheme";

import { Provider, connect } from "react-redux";
import store from "../store";
import { ActionCreators } from "../actions";
const mapStateToProps = (state) => ({
  username: state.user.username,
});
const mapDispatchToProps = (dispatch) => ({});
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
import UnAuthRedirect from "./UnAuthRedirect";
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
import Home from "./Home";

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
          <div className="site-content">
            <Switch>
              <Route
                path="/login"
                render={(props) => (
                  <AuthRedirect {...props} component={Login} />
                )}
              />
              <Route path="/logout" component={Logout} />
              <Route
                path="/sign-up"
                render={(props) => (
                  <AuthRedirect {...props} component={SignUp} />
                )}
              />
              <Route
                path="/my-account"
                render={(props) => (
                  <UnAuthRedirect {...props} component={Account} />
                )}
              />
              <Route
                path="/payment"
                render={(props) => (
                  <UnAuthRedirect {...props} component={Payment} />
                )}
              />
              <Route
                path="/note/:noteId"
                render={(props) => (
                  <UnAuthRedirect
                    key={props.match.params.noteId}
                    {...props}
                    component={NotePage}
                  />
                )}
              />
              <Route
                path="/note-upload"
                render={(props) => (
                  <UnAuthRedirect {...props} component={NoteUploader} />
                )}
              />
              <Route
                path="/image/:imageId"
                render={(props) => (
                  <UnAuthRedirect
                    key={props.match.params.imageId}
                    {...props}
                    component={ImagePage}
                  />
                )}
              />
              <Route
                path="/image-upload"
                render={(props) => (
                  <UnAuthRedirect {...props} component={ImageUploader} />
                )}
              />
              <Route
                path="/video-player/:videoId"
                render={(props) => (
                  <UnAuthRedirect
                    key={props.match.params.videoId}
                    {...props}
                    component={VideoPage}
                  />
                )}
              />
              <Route
                path="/video-upload"
                render={(props) => (
                  <UnAuthRedirect {...props} component={VideoUploader} />
                )}
              />
              <Route
                path="/profile/:username"
                render={(props) => (
                  <UnAuthRedirect
                    key={props.match.params.username}
                    {...props}
                    component={Profile}
                  />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/users" component={Users} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
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
