import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { withStyles } from "@material-ui/core/styles";

import ContentActions from "./ContentActions";

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
  imageContainer: {
    paddingBottom: "100%",
    position: "relative",
  },
  img: {
    position: "absolute",
    width: "100% !important",
    height: "100% !important",
    left: 0,
    bottom: 0,
  },
  caption: {
    fontSize: 15,
    fontWeight: 400,
  },
  metric: {
    fontSize: 14,
    marginRight: 12,
  },
});

class Image_C extends Component {
  render() {
    const {
      classes,
      id,
      user,
      url,
      title,
      caption,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      likeImage,
      dislikeImage,
    } = this.props;

    return (
      <Card className={classes.container}>
        <CardMedia className={classes.imageContainer}>
          <img className={classes.img} src={url} />
        </CardMedia>
        <CardHeader
          avatar={<Avatar src={user.profilePic} />}
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
        <CardContent className={classes.caption}>{caption}</CardContent>
        <ContentActions
          contentType="image"
          id={id}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          commentCount={commentCount}
          like={() => likeImage(id)}
          dislike={() => dislikeImage(id)}
        />
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  likeImage: (imageId) => dispatch(ActionCreators.likeImageStart(imageId)),
  dislikeImage: (imageId) =>
    dispatch(ActionCreators.dislikeImageStart(imageId)),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Image_C));
