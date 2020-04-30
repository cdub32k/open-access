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
    const { body, uploadedAt } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8}>
          <Note body={body} uploadedAt={uploadedAt} />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  body: state.note.body,
  uploadedAt: state.note.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getNoteInfo: (noteId) => dispatch(ActionCreators.getNoteInfoStart(noteId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
