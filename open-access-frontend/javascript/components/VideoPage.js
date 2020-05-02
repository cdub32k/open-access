import React, { Component } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import VideoPlayer from "./VideoPlayer";
import PreviewVideoPlayer from "./PreviewVideoPlayer";

class VideoPage extends Component {
  componentDidMount() {
    const { videoId } = this.props.match.params;
    this.props.getVideoInfo(videoId);
  }

  render() {
    const {
      loading,
      user,
      title,
      caption,
      viewCount,
      likeCount,
      dislikeCount,
      commentCount,
      url,
      thumbUrl,
      uploadedAt,
      liked,
      disliked,
      match: {
        params: { videoId },
      },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8}>
          {loading ? (
            <PreviewVideoPlayer />
          ) : (
            <VideoPlayer
              id={videoId}
              user={user}
              title={title}
              caption={caption}
              viewCount={viewCount}
              url={url}
              thumbUrl={thumbUrl}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              commentCount={commentCount}
              uploadedAt={uploadedAt}
              liked={liked}
              disliked={disliked}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.video.loading,
  user: state.video.user,
  title: state.video.title,
  caption: state.video.caption,
  viewCount: state.video.viewCount,
  likeCount: state.video.likeCount,
  dislikeCount: state.video.dislikeCount,
  commentCount: state.video.commentCount,
  liked: state.video.liked,
  disliked: state.video.disliked,
  url: state.video.url,
  thumbUrl: state.video.thumbUrl,
  uploadedAt: state.video.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getVideoInfo: (videoId) =>
    dispatch(ActionCreators.getVideoInfoStart(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
