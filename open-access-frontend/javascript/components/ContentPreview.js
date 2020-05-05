import React, { Component } from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import { num2str, date2rel } from "../util/helpers";

const styles = (theme) => ({
  container: {
    height: 240,
    width: 300,
    margin: "18px 6px",
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
  previewDetails: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "10px",
    maxWidth: "75%",
    marginTop: 8,
  },
});

const ContentPreview = ({
  classes,
  contentType,
  id,
  user,
  thumbUrl,
  title,
  viewCount,
  likeCount,
  commentCount,
  body,
  caption,
  uploadedAt,
}) => {
  let linkPrefix, metric;
  switch (contentType) {
    case "video":
      linkPrefix = "/video-player";
      metric = `${num2str(viewCount)} views`;
      break;
    case "image":
      linkPrefix = "/image";
      metric = `${num2str(likeCount)} likes`;
      break;
    case "note":
      linkPrefix = "/note";
      metric = `${num2str(commentCount)} comments`;
      break;
    default:
      break;
  }

  return (
    <Card className={classes.container}>
      <Link to={`${linkPrefix}/${id}`}>
        {contentType != "note" && (
          <CardMedia className={classes.thumb} image={thumbUrl} />
        )}
        {contentType == "note" && (
          <CardContent className={classes.thumb}>{body}</CardContent>
        )}
      </Link>
      <CardHeader
        className={classes.previewDetailsContainer}
        avatar={<Avatar src={user.profilePic} />}
        title={<span className={classes.title}>{title}</span>}
        subheader={
          <div className={classes.previewDetails}>
            <div>{metric}</div>
            <div>{date2rel(uploadedAt)}</div>
          </div>
        }
      />
    </Card>
  );
};

export default withStyles(styles)(ContentPreview);
