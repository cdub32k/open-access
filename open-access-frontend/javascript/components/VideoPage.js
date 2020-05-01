import React, { Component } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import VideoPlayer from "./VideoPlayer";

class VideoPage extends Component {
  componentDidMount() {
    const { videoId } = this.props.match.params;
    this.props.getVideoInfo(videoId);
  }

  render() {
    const {
      user,
      title,
      caption,
      viewCount,
      url,
      thumbUrl,
      uploadedAt,
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8}>
          <VideoPlayer
            user={user}
            title={title}
            caption={caption}
            viewCount={viewCount}
            url={url}
            thumbUrl={thumbUrl}
            uploadedAt={uploadedAt}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.video.user,
  title: state.video.title,
  caption: state.video.caption,
  viewCount: state.video.viewCount,
  url: state.video.url,
  thumbUrl: state.video.thumbUrl,
  uploadedAt: state.video.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getVideoInfo: (videoId) =>
    dispatch(ActionCreators.getVideoInfoStart(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
