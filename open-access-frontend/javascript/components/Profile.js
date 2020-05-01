import React, { Component } from "react";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import ProfileHeader from "./ProfileHeader";
import VideoList from "./VideoList";
import ImageList from "./ImageList";
import NoteList from "./NoteList";

class Profile extends Component {
  state = {};

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getUserInfo(username);
  }

  render() {
    const { username } = this.props.match.params;
    const { loading, videos, images, notes } = this.props;

    return (
      <div>
        <ProfileHeader loading={loading} />
        <h3>Videos</h3>
        <VideoList videos={videos} loading={loading} />
        <br />
        <h3>Images</h3>
        <ImageList images={images} loading={loading} />
        <br />
        <h3>Notes</h3>
        <NoteList notes={notes} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.viewed.loading,
  username: state.user.viewed.username,
  videos: state.user.viewed.videos,
  images: state.user.viewed.images,
  notes: state.user.viewed.notes,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (username) =>
    dispatch(ActionCreators.getUserInfoStart(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
