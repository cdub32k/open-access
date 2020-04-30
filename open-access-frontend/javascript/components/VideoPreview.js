import React, { Component } from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    height: 320,
    width: 320,
    margin: 24,
    display: "inline-block",
  },
  thumb: {
    height: 250,
    width: 300,
  },
});

const VideoPreview = ({ classes, videoId, thumbUrl, title, views }) => {
  return (
    <Card className={classes.container}>
      <Link to={`/video-player/${videoId}`}>
        <CardMedia className={classes.thumb} image={thumbUrl} />
      </Link>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={<span>{title}</span>}
        subheader={<span>{views} views</span>}
      />
    </Card>
  );
};

export default withStyles(styles)(VideoPreview);
