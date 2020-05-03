import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ActionCreators } from "../actions";

const CommentForm = ({
  id,
  contentType,
  postToVideo,
  postToImage,
  postToNote,
}) => {
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
    <form onSubmit={postComment}>
      <TextField
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        name="body"
      />
      <Button variant="contained" color="secondary" type="submit">
        Post comment
      </Button>
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
