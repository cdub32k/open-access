import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AddCommentIcon from "@material-ui/icons/AddComment";
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
  noteContainer: {
    paddingBottom: "56.25%",
    position: "relative",
  },
  note: {
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  metric: {
    fontSize: 14,
    marginRight: 12,
  },
});

class Note extends Component {
  render() {
    const {
      classes,
      user,
      body,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
    } = this.props;
    return (
      <Card className={classes.container}>
        <CardContent className={classes.noteContainer}>
          <div className={classes.note}>
            <div>{body}</div>
          </div>
        </CardContent>
        <CardHeader
          avatar={<Avatar src={user.profilePic} />}
          title={
            <span style={{ fontSize: 12 }}>
              by {user.username}
              <br />
              {date2rel(uploadedAt)}
            </span>
          }
        />
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <span className={classes.metric}>{num2str(likeCount)}</span>
          <IconButton>
            <ThumbDownIcon />
          </IconButton>
          <span className={classes.metric}>{num2str(dislikeCount)}</span>
          <IconButton>
            <AddCommentIcon />
          </IconButton>
          <span className={classes.metric}>{num2str(commentCount)}</span>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Note);
