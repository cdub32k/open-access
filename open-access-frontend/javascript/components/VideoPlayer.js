import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import ContentActions from "./ContentActions";

import { date2rel, thousandsSeparators } from "../util/helpers";

const styles = (theme) => ({
  container: {
    position: "relative",
    width: "calc(100% - 48px);",
    margin: 24,
    display: "inline-block",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
  },
  playerContainer: {
    paddingBottom: "56.25%",
    position: "relative",
  },
  player: {
    position: "absolute",
    width: "100% !important",
    height: "100% !important",
    left: 0,
    bottom: 0,
  },
});

class VideoPlayer extends Component {
  render() {
    const {
      id,
      classes,
      contentType,
      user,
      url,
      thumbUrl,
      title,
      viewCount,
      likeCount,
      dislikeCount,
      commentCount,
      caption,
      uploadedAt,
      recordView,
      likeVideo,
      dislikeVideo,
    } = this.props;

    return (
      <Card className={classes.container}>
        <CardMedia className={classes.playerContainer}>
          <ReactPlayer
            className={classes.player}
            url={url}
            light={thumbUrl}
            playing
            controls
            pip={false}
            onStart={() => recordView(id)}
          />
        </CardMedia>
        <CardHeader
          avatar={<Avatar src={user.profilePic}>R</Avatar>}
          title={
            <span style={{ fontSize: 12 }}>
              <span style={{ fontSize: 18 }}>{title}</span>
              <br />
              by {user.username}
              <br />
              {date2rel(uploadedAt)}
            </span>
          }
        />
        <CardContent style={{ paddingTop: 0 }}>
          <div style={{ fontWeight: 400 }}>
            {thousandsSeparators(viewCount)} views
          </div>
          <br />
          {caption}
        </CardContent>
        <ContentActions
          contentType="video"
          like={() => likeVideo(id)}
          dislike={() => dislikeVideo(id)}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          commentCount={commentCount}
        />
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  recordView: (videoId) =>
    dispatch(ActionCreators.recordVideoViewStart(videoId)),
  likeVideo: (videoId) => dispatch(ActionCreators.likeVideoStart(videoId)),
  dislikeVideo: (videoId) =>
    dispatch(ActionCreators.dislikeVideoStart(videoId)),
});

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(VideoPlayer)
);
