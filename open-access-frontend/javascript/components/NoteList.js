import React, { Component } from "react";

import NotePreview from "./NotePreview";

class NoteList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const noteListHTML = this.props.notes.map((note, i) => {
      return <NotePreview id={note._id} body={note.body} key={i} />;
    });

    return <div>{noteListHTML}</div>;
  }
}

export default NoteList;
