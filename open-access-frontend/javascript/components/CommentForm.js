import React, { useState } from "react";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 600,
  },
  textField: {
    marginRight: 12,
  },
}));

const CommentForm = ({
  id,
  contentType,
  postToVideo,
  postToImage,
  postToNote,
}) => {
  const classes = useStyles();

  const [body, setBody] = useState("");

  let action;
  switch (contentType) {
    case "note":
      action = postToNote;
      break;
    case "image":
      action = postToImage;
      break;
    case "video":
      action = postToVideo;
    default:
      break;
  }

  const postComment = (e) => {
    e.preventDefault();
    action(id, body);
    setBody("");
  };

  return (
    <form onSubmit={postComment} className={classes.container}>
      <CustomInput
        value={body}
        name="body"
        onChange={(e) => setBody(e.target.value)}
        multiline
        className={classes.textField}
      />
      <CustomButton
        disabled={!body.trim()}
        text="comment"
        onClick={postComment}
        style={{ width: 100 }}
        size="small"
      />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  postToVideo: (id, body) =>
    dispatch(ActionCreators.postVideoCommentStart(id, body)),
  postToImage: (id, body) =>
    dispatch(ActionCreators.postImageCommentStart(id, body)),
  postToNote: (id, body) =>
    dispatch(ActionCreators.postNoteCommentStart(id, body)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
