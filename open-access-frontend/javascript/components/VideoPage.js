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
    const { title, caption, views, url, thumbUrl } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8}>
          <VideoPlayer
            title={title}
            caption={caption}
            views={views}
            url={url}
            thumbUrl={thumbUrl}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.video.title,
  caption: state.video.caption,
  views: state.video.views,
  url: state.video.url,
  thumbUrl: state.video.thumbUrl,
  uploadedAt: state.video.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getVideoInfo: (videoId) =>
    dispatch(ActionCreators.getVideoInfoStart(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
