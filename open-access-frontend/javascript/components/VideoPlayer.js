import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import { num2str, date2rel } from "../util/helpers";

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
  previewDetails: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
    maxWidth: "75%",
    marginTop: 8,
  },
});

class VideoPlayer extends Component {
  render() {
    const {
      classes,
      contentType,
      user,
      url,
      thumbUrl,
      title,
      viewCount,
      caption,
      uploadedAt,
    } = this.props;

    let metric = `${num2str(viewCount)} views`;

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
          />
        </CardMedia>
        <CardHeader
          avatar={<Avatar src={user.profilePic}>R</Avatar>}
          title={
            <span style={{ fontSize: 12 }}>
              <span style={{ fontSize: 18 }}>{title}</span>
              <br />
              by {user.username}
            </span>
          }
          subheader={
            <div className={classes.previewDetails}>
              <div>{metric}</div>
              <div>{date2rel(uploadedAt)}</div>
            </div>
          }
        />
        <CardContent>{caption}</CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
