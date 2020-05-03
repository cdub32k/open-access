import React, { Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import CommentForm from "./CommentForm";
import Comment from "./Comment";

const CommentsSection = ({ comments, contentType, id }) => {
  return (
    <Fragment>
      <CommentForm contentType={contentType} id={id} />
      <hr />

      <TransitionGroup component="section">
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
