import React, { Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { makeStyles } from "@material-ui/core/styles";

import CommentForm from "./CommentForm";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minWidth: 480,
  },
  section: {
    paddingRight: 32,
    overflowY: "scroll",
    maxHeight: 800,
  },
}));

const CommentsSection = ({ comments, contentType, id }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.container} comments-container`}>
      <CommentForm contentType={contentType} id={id} />
      <TransitionGroup
        component="section"
        className={`${classes.section} comments-section`}
      >
        {comments.map((comment, i) => (
          <CSSTransition
            timeout={500}
            classNames="comment"
            unmountOnExit
            appear
            enter
            key={comment._id}
          >
            <Comment
              body={comment.body}
              user={comment.user}
              createdAt={comment.createdAt}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default CommentsSection;
