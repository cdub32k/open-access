import React, { Component } from "react";

import VideoPlayer from "./VideoPlayer";

class VideoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const videoListHTML = this.props.videos.map((video, i) => {
      return (
        <VideoPlayer
          url={video.url}
          title={video.title}
          width={300}
          height="auto"
          key={i}
        />
      );
    });

    return <div>{videoListHTML}</div>;
  }
}

export default VideoList;
