import React, { Component } from "react";

import axios from "axios";

import VideoPlayer from "./VideoPlayer";
import VideoUploader from "./VideoUploader";

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    axios.get("/videos/user/first_member").then((res) => {
      this.setState({
        videos: res.data.videos,
      });
    });
  }

  render() {
    const videoListHTML = this.state.videos.map((video, i) => {
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

    return (
      <div>
        <VideoUploader />
        <br />
        <br />
        {videoListHTML}
      </div>
    );
  }
}

export default VideoList;
