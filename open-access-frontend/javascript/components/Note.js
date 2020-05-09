import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

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

import ContentActions from "./ContentActions";

import { num2str, date2rel } from "../utils/helpers";

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
      id,
      user,
      body,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      likeNote,
      dislikeNote,
      liked,
      disliked,
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
        <ContentActions
          contentType="note"
          id={id}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          commentCount={commentCount}
          like={() => likeNote(id)}
          dislike={() => dislikeNote(id)}
          liked={liked}
          disliked={disliked}
        />
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  likeNote: (noteId) => dispatch(ActionCreators.likeNoteStart(noteId)),
  dislikeNote: (noteId) => dispatch(ActionCreators.dislikeNoteStart(noteId)),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Note));
