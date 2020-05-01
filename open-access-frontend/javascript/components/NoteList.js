import React, { Component } from "react";

import ContentPreview from "./ContentPreview";

class NoteList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const noteListHTML = this.props.notes.map((note, i) => {
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

    return <div>{noteListHTML}</div>;
  }
}

export default NoteList;
