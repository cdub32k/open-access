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

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, loading } = this.props;
    const videoListHTML = loading
      ? Array.from({ length: 8 }).map((preview, i) => {
          return <PreviewPlaceholder key={i} />;
        })
      : this.props.videos.map((video, i) => {
          return (
            <ContentPreview
              contentType="video"
              user={video.user}
              id={video._id}
              thumbUrl={video.thumbUrl}
              title={video.title}
              viewCount={video.viewCount}
              uploadedAt={video.uploadedAt}
              key={i}
            />
          );
        });

    return <div className={classes.contentList}>{videoListHTML}</div>;
  }
}

export default withStyles(styles)(VideoList);
