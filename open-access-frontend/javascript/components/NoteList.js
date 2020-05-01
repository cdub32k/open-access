import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import ContentPreview from "./ContentPreview";
import PreviewPlaceholder from "./PreviewPlaceholder";

const styles = (theme) => ({
  contentList: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});

class NoteList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, loading } = this.props;

    const noteListHTML = loading
      ? Array.from({ length: 8 }).map((preview, i) => {
          return <PreviewPlaceholder key={i} />;
        })
      : this.props.notes.map((note, i) => {
          return (
            <ContentPreview
              contentType="note"
              id={note._id}
              user={note.user}
              body={note.body}
              commentCount={note.commentCount}
              uploadedAt={note.uploadedAt}
              key={i}
            />
          );
        });

    return <div className={classes.contentList}>{noteListHTML}</div>;
  }
}

export default withStyles(styles)(NoteList);
