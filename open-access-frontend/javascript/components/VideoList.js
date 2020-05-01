import React, { Component } from "react";

import ContentPreview from "./ContentPreview";

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const videoListHTML = this.props.videos.map((video, i) => {
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

    return <div>{videoListHTML}</div>;
  }
}

export default VideoList;
