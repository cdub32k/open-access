import React, { useState } from "react";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

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
    <form
      onSubmit={postComment}
      style={{ marginBottom: 24, textAlign: "right" }}
    >
      <CustomInput
        value={body}
        name="body"
        onChange={(e) => setBody(e.target.value)}
        rows={3}
      />
      <CustomButton text="Post comment" onClick={postComment} size="small" />
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
