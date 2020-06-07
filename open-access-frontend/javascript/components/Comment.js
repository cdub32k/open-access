import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { Link } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownOutline from "@material-ui/icons/ThumbDownOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { date2rel } from "../utils/helpers";

import CustomInput from "./CustomInput";
import MediaOwnerActions from "./MediaOwnerActions";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 54,
    minWidth: 320,
  },
  comment: {
    display: "flex",
    marginBottom: 8,
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-word",
  },
  userInfo: {
    marginBottom: 12,
  },
  ownerActions: {
    position: "absolute",
    right: 10,
    top: -14,
  },
  replyLink: {
    fontSize: 11,
    cursor: "pointer",
  },
  replyForm: {
    marginLeft: 12,
  },
  repliesSection: {
    marginLeft: 12,
  },
}));

let Comment = ({
  _id,
  mediaId,
  body,
  user,
  createdAt,
  type,
  mineUsername,
  updateComment,
  replyCount,
  replyId,
  getReplies,
  replies,
}) => {
  const classes = useStyles();
  const [newBody, setNewBody] = useState(body);
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    if (replies && replyFormOpen) {
      setShowReplies(true);
      setReplyFormOpen(false);
    }
  }, [replies]);

  const update = () => {
    let path;
    switch (type) {
      case "video":
        path = `/videos/comments/${_id}`;
        break;
      case "image":
        path = `/images/comments/${_id}`;
        break;
      case "note":
        path = `/notes/comments/${_id}`;
    }

    return axios.put(path, { body: newBody }).then((res) => {
      updateComment(type, _id, newBody);
    });
  };

  const showReplyForm = () => {
    setReplyFormOpen(!replyFormOpen);
  };

  const replyStyle = {};
  if (replyId) {
    replyStyle.avatar = { width: 28, height: 28 };
    replyStyle.container = { marginBottom: 20 };
  }

  return (
    <div className={classes.container} style={replyStyle.container}>
      <article className={classes.comment}>
        <Link to={`/profile/${user.username}`}>
          <Avatar
            src={user.profilePic}
            className={classes.avatar}
            style={replyStyle.avatar}
          />
        </Link>
        <div className={classes.textSection}>
          <Typography className={classes.userInfo} variant="body2">
            <Link to={`/profile/${user.username}`}>
              <b>@{user.username}</b>
            </Link>
            &nbsp;&#8226;&nbsp;{date2rel(createdAt)}
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap" }} variant="body1">
            {body}
          </Typography>
        </div>
        {user.username == mineUsername && (
          <MediaOwnerActions
            className={classes.ownerActions}
            _id={_id}
            type={type + "Comment"}
            editTitle={"Edit Comment"}
            editForm={
              <CustomInput
                name="body"
                value={newBody}
                multiline={true}
                onChange={(e) => setNewBody(e.target.value)}
              />
            }
            editCallback={update}
          />
        )}
      </article>
      <div className={classes.actionSection}>
        <a className={classes.replyLink} onClick={showReplyForm}>
          {!replyFormOpen ? "REPLY" : "CANCEL"}
        </a>
        {replyFormOpen && (
          <CommentForm
            className={classes.replyForm}
            contentType={type}
            id={mediaId}
            replyId={_id}
          />
        )}
      </div>
      {replyCount > 0 && (
        <div className={classes.repliesSection}>
          <a
            className={classes.replyLink}
            onClick={() => {
              if (!showReplies && (!replies || replies.length != replyCount))
                getReplies(type, _id);
              setShowReplies(!showReplies);
            }}
          >
            {!showReplies ? `show ${replyCount} ` : "hide "} replies
          </a>
          {showReplies &&
            replies &&
            replies.map((reply) => {
              return (
                <Comment
                  key={reply._id}
                  type={type}
                  mediaId={mediaId}
                  _id={reply._id}
                  body={reply.body}
                  user={reply.user}
                  createdAt={reply.createdAt}
                  replyCount={reply.replyCount}
                  replyId={reply.replyId}
                  replies={reply.replies}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  mineUsername: state.user.username,
});
const mapDispatchToProps = (dispatch) => ({
  updateComment: (type, _id, body) =>
    dispatch(ActionCreators.updateComment(type, _id, body)),
  getReplies: (type, _id) =>
    dispatch(ActionCreators.getCommentReplies(type, _id)),
});

Comment = connect(mapStateToProps, mapDispatchToProps)(Comment);

export default Comment;
