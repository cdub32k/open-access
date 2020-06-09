import React, { useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./VideoPlayer";
import PreviewVideoPlayer from "./PreviewVideoPlayer";
import CommentsSection from "./CommentsSection";
import MediaOwnerActions from "./MediaOwnerActions";

const useStyles = makeStyles((theme) => ({
  ownerActions: {
    position: "absolute",
    top: 0,
    right: 56,
  },
}));

const VideoPage = ({
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
  match,
  location,
  mineUsername,
  getVideoInfo,
  clearVideoData,
  hasMoreComments,
}) => {
  const { videoId } = match.params;
  let c;
  if (location.search.indexOf("c=") > -1)
    c = location.search.substring(location.search.indexOf("c=") + 2);
  useEffect(() => {
    getVideoInfo(videoId, c);
    return () => clearVideoData();
  }, []);

  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={8}
        style={{ paddingRight: 32, position: "relative" }}
      >
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
              <MediaOwnerActions
                className={classes.ownerActions}
                _id={videoId}
                type="video"
                editForm={<Redirect to={`/video/edit/${videoId}`} />}
              />
            )}
          </Fragment>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <CommentsSection
          comments={comments}
          contentType="video"
          id={videoId}
          hasMoreComments={hasMoreComments}
        />
      </Grid>
    </Grid>
  );
};

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
  hasMoreComments: state.video.hasMoreComments,
});

const mapDispatchToProps = (dispatch) => ({
  getVideoInfo: (videoId, cId) =>
    dispatch(ActionCreators.getVideoInfoStart(videoId, cId)),

  clearVideoData: () => dispatch(ActionCreators.clearVideoData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
