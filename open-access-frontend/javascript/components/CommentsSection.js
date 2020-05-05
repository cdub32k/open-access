import React, { Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { makeStyles } from "@material-ui/core/styles";

import CommentForm from "./CommentForm";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  section: {
    maxHeight: 800,
    paddingRight: 32,
    overflowY: "scroll",
  },
}));

const CommentsSection = ({ comments, contentType, id }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <CommentForm contentType={contentType} id={id} />
      <hr />

      <TransitionGroup component="section" className={classes.section}>
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
    </Fragment>
  );
};

export default CommentsSection;
