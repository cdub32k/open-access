import React, { Component } from "react";

import VideoPreview from "./VideoPreview";

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const videoListHTML = this.props.videos.map((video, i) => {
      return (
        <VideoPreview
          videoId={video._id}
          thumbUrl={video.thumbUrl}
          title={video.title}
          views={video.views}
          key={i}
        />
      );
    });

    return <div>{videoListHTML}</div>;
  }
}

export default VideoList;
