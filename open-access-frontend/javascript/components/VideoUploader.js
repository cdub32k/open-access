import React, { Component } from "react";

import axios from "axios";

import Button from "@material-ui/core/Button";

class VideoUploader extends Component {
  state = {
    selectedFile: null,
  };

  constructor(props) {
    super(props);
  }

  onChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0], loaded: 0 });
  };

  onClickHandler = (e) => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);

    axios.post("/videos/upload", data).then((res) => {});
  };

  render() {
    return (
      <div>
        <input
          type="file"
          name="file"
          onChange={this.onChangeHandler}
          accept="video/mp4,video/x-m4v,video/*"
        />
        <Button type="button" onClick={this.onClickHandler}>
          Upload
        </Button>
      </div>
    );
  }
}

export default VideoUploader;
