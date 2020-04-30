import React, { Component } from "react";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ImageUploader extends Component {
  state = {
    imageFile: null,
    title: "",
    caption: "",
  };

  constructor(props) {
    super(props);
  }

  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  imageHandler = (e) => {
    this.setState({ imageFile: e.target.files[0], loaded: 0 });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.imageFile);
    data.append("title", this.state.title);
    data.append("caption", this.state.caption);

    axios.post("/images/upload", data).then((res) => {});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="file"
            name="image"
            onChange={this.imageHandler}
            accept="image/*"
          />
          <TextField name="title" onChange={this.onTextChange} />
          <TextField name="caption" onChange={this.onTextChange} />
          <Button type="submit" onClick={this.onClickHandler}>
            Upload
          </Button>
        </form>
      </div>
    );
  }
}

export default ImageUploader;
