import React, { Component } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import Note from "./Note";

class NotePage extends Component {
  componentDidMount() {
    const { noteId } = this.props.match.params;
    this.props.getNoteInfo(noteId);
  }

  render() {
    const {
      user,
      body,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      match: {
        params: { noteId },
      },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Note
            id={noteId}
            user={user}
            body={body}
            uploadedAt={uploadedAt}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            commentCount={commentCount}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.note.user,
  body: state.note.body,
  likeCount: state.note.likeCount,
  dislikeCount: state.note.dislikeCount,
  commentCount: state.note.commentCount,
  uploadedAt: state.note.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getNoteInfo: (noteId) => dispatch(ActionCreators.getNoteInfoStart(noteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
