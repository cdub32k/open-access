import React, { Component } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";

class NoteUploader extends Component {
  state = {
    noteBody: "",
  };

  constructor(props) {
    super(props);
  }

  updateBody = (event) => {
    this.setState({
      noteBody: event.target.value,
    });
  };

  onClickHandler = () => {
    axios
      .post("/api", {
        query: `
      mutation {
        postNote(body:"${this.state.noteBody}") {
          body
        }
      }
    `,
      })
      .then((res) => console.log(res.data.data.postNote));
  };

  render() {
    return (
      <div>
        <textarea onChange={this.updateBody} />
        <Button type="button" onClick={this.onClickHandler}>
          Upload
        </Button>
      </div>
    );
  }
}

export default NoteUploader;
