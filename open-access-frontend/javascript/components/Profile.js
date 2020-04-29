import React, { Component } from "react";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import VideoList from "./VideoList";

class Profile extends Component {
  state = {};

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getUserInfo(username);
  }

  render() {
    const { username } = this.props.match.params;
    const { videos } = this.props;
    return (
      <div>
        <h1>Hi {username}!</h1>
        <VideoList videos={videos} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.viewed.username,
  videos: state.user.viewed.videos,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (username) =>
    dispatch(ActionCreators.getUserInfoStart(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
