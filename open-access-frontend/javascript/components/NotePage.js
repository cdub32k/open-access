import React, { useEffect, Fragment } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Note from "./Note";
import PreviewNote from "./PreviewNote";
import CommentForm from "./CommentForm";
import CommentsSection from "./CommentsSection";
import MediaOwnerActions from "./MediaOwnerActions";
import { getCommentId } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  ownerActions: {
    position: "absolute",
    top: 0,
    right: 56,
  },
}));

const NotePage = ({
  loading,
  user,
  caption,
  likeCount,
  dislikeCount,
  commentCount,
  uploadedAt,
  liked,
  disliked,
  comments,
  match,
  mineUsername,
  getNoteInfo,
  clearNoteData,
  hasMoreComments,
}) => {
  const { noteId } = match.params;
  let c = getCommentId(location.search);
  useEffect(() => {
    getNoteInfo(noteId, c);
    return () => clearNoteData();
  }, []);

  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        style={{ paddingRight: 32, position: "relative" }}
      >
        {loading ? (
          <PreviewNote />
        ) : (
          <Fragment>
            <Note
              _id={noteId}
              user={user}
              caption={caption}
              uploadedAt={uploadedAt}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              commentCount={commentCount}
              liked={liked}
              disliked={disliked}
            />
            {user.username == mineUsername && (
              <MediaOwnerActions
                className={classes.ownerActions}
                _id={noteId}
                type="note"
              />
            )}
          </Fragment>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <CommentsSection
          comments={comments}
          contentType="note"
          id={noteId}
          hasMoreComments={hasMoreComments}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  loading: state.note.loading,
  user: state.note.user,
  caption: state.note.caption,
  likeCount: state.note.likeCount,
  dislikeCount: state.note.dislikeCount,
  commentCount: state.note.commentCount,
  uploadedAt: state.note.uploadedAt,
  liked: state.note.liked,
  disliked: state.note.disliked,
  comments: state.note.comments,
  mineUsername: state.user.username,
  hasMoreComments: state.note.hasMoreComments,
});

const mapDispatchToProps = (dispatch) => ({
  getNoteInfo: (noteId, cId) =>
    dispatch(ActionCreators.getNoteInfoStart(noteId, cId)),
  clearNoteData: () => dispatch(ActionCreators.clearNoteData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
