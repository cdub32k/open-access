import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import ContentDetails from "./ContentDetails";

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
      classes,
      user,
      url,
      thumbUrl,
      title,
      viewCount,
      caption,
      uploadedAt,
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
            <ContentDetails viewCount={viewCount} uploadedAt={uploadedAt} />
          }
        />
        <CardContent>{caption}</CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
