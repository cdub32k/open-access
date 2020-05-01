import React, { Component } from "react";
import { connect } from "react-redux";

import ContentPreview from "./ContentPreview";

class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const imageListHTML = this.props.images.map((image, i) => {
      return (
        <ContentPreview
          contentType="image"
          user={image.user}
          id={image._id}
          title={image.title}
          thumbUrl={image.url}
          likeCount={image.likeCount}
          uploadedAt={image.uploadedAt}
          key={i}
        />
      );
    });

    return <div>{imageListHTML}</div>;
  }
}

export default ImageList;
