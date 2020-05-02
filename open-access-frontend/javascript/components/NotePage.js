import React, { Component } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import Note from "./Note";
import PreviewNote from "./PreviewNote";
import CommentForm from "./CommentForm";

class NotePage extends Component {
  componentDidMount() {
    const { noteId } = this.props.match.params;
    this.props.getNoteInfo(noteId);
  }

  render() {
    const {
      loading,
      user,
      body,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      liked,
      disliked,
      comments,
      match: {
        params: { noteId },
      },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          {loading ? (
            <PreviewNote />
          ) : (
            <Note
              id={noteId}
              user={user}
              body={body}
              uploadedAt={uploadedAt}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
              commentCount={commentCount}
              liked={liked}
              disliked={disliked}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CommentForm contentType="note" id={noteId} />
          <hr />
          {comments.map((comment, i) => {
            return (
              <div key={i}>
                {comment.body} by {comment.user.username}
              </div>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.note.loading,
  user: state.note.user,
  body: state.note.body,
  likeCount: state.note.likeCount,
  dislikeCount: state.note.dislikeCount,
  commentCount: state.note.commentCount,
  uploadedAt: state.note.uploadedAt,
  liked: state.note.liked,
  disliked: state.note.disliked,
  comments: state.note.comments,
});

const mapDispatchToProps = (dispatch) => ({
  getNoteInfo: (noteId) => dispatch(ActionCreators.getNoteInfoStart(noteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
