import React, { Component } from "react";
import { connect } from "react-redux";

import ImagePreview from "./ImagePreview";

class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imageListHTML = this.props.images.map((image, i) => {
      return <ImagePreview id={image._id} url={image.url} key={i} />;
    });

    return <div>{imageListHTML}</div>;
  }
}

export default ImageList;
