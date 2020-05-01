import React, { Component } from "react";
import { connect } from "react-redux";

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

class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, loading } = this.props;

    const imageListHTML = loading
      ? Array.from({ length: 8 }).map((preview, i) => {
          return <PreviewPlaceholder key={i} />;
        })
      : this.props.images.map((image, i) => {
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

    return <div className={classes.contentList}>{imageListHTML}</div>;
  }
}

export default withStyles(styles)(ImageList);
