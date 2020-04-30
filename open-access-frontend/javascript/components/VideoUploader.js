import React, { Component } from "react";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class VideoUploader extends Component {
  state = {
    videoFile: null,
    thumbFile: null,
    title: "",
    caption: "",
  };

  constructor(props) {
    super(props);
  }

  videoHandler = (e) => {
    this.setState({ videoFile: e.target.files[0], loaded: 0 });
  };

  thumbHandler = (e) => {
    this.setState({ thumbFile: e.target.files[0], loaded: 0 });
  };

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("video", this.state.videoFile);
    data.append("thumb", this.state.thumbFile);
    data.append("title", this.state.title);
    data.append("caption", this.state.caption);

    axios.post("/videos/upload", data).then((res) => {});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="file"
            name="video"
            onChange={this.videoHandler}
            accept="video/mp4,video/x-m4v,video/*"
          />
          <input
            type="file"
            name="thumb"
            onChange={this.thumbHandler}
            accept="image/*"
          />
          <TextField name="title" onChange={this.onTextChange} />
          <TextField name="caption" onChange={this.onTextChange} />
          <Button type="submit">Upload</Button>
        </form>
      </div>
    );
  }
}

export default VideoUploader;
