import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import VideoPlayer from "./VideoPlayer";
import PreviewVideoPlayer from "./PreviewVideoPlayer";
import CommentsSection from "./CommentsSection";
import MediaOwnerActions from "./MediaOwnerActions";

class VideoPage extends Component {
  componentDidMount() {
    const { videoId } = this.props.match.params;
    this.props.getVideoInfo(videoId);
  }

  componentWillUnmount() {
    this.props.clearVideoData();
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
      comments,
      match: {
        params: { videoId },
      },
      mineUsername,
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8} style={{ paddingRight: 32 }}>
          {loading ? (
            <PreviewVideoPlayer />
          ) : (
            <Fragment>
              <VideoPlayer
                _id={videoId}
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
              {user.username == mineUsername && (
                <MediaOwnerActions _id={videoId} type="video" />
              )}
            </Fragment>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CommentsSection
            comments={comments}
            contentType="video"
            id={videoId}
          />
        </Grid>
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
  comments: state.video.comments,
  mineUsername: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getVideoInfo: (videoId) =>
    dispatch(ActionCreators.getVideoInfoStart(videoId)),

  clearVideoData: () => dispatch(ActionCreators.clearVideoData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
