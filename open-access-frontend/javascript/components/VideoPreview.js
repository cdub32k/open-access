import React, { Component } from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import ContentDetails from "./ContentDetails";

const styles = (theme) => ({
  container: {
    height: 240,
    width: 300,
    margin: 24,
    display: "inline-block",
    position: "relative",
  },
  thumb: {
    height: 169,
    width: 300,
  },
  previewDetailsContainer: {
    position: "absolute",
    width: "100%",
    height: 72,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    minHeight: 44,
    lineHeight: 0,
  },
});

const VideoPreview = ({
  classes,
  videoId,
  user,
  thumbUrl,
  title,
  viewCount,
  uploadedAt,
}) => {
  return (
    <Card className={classes.container}>
      <Link to={`/video-player/${videoId}`}>
        <CardMedia className={classes.thumb} image={thumbUrl} />
      </Link>
      <CardHeader
        className={classes.previewDetailsContainer}
        avatar={<Avatar src={user.profilePic} />}
        title={<span className={classes.title}>{title}</span>}
        subheader={
          <ContentDetails viewCount={viewCount} uploadedAt={uploadedAt} />
        }
      />
    </Card>
  );
};

export default withStyles(styles)(VideoPreview);
