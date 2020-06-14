import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

import ContentPreview from "./ContentPreview";
import PreviewPlaceholder from "./PreviewPlaceholder";
import CustomButton from "./CustomButton";

const styles = (theme) => ({
  container: {
    textAlign: "center",
    margin: "32px 0",
  },
  contentList: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: 1248,
    padding: 0,
  },
});

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPage: 0,
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore = () => {
    this.props.loadMore(this.state.videoPage + 1);
    this.setState({
      videoPage: this.state.videoPage + 1,
    });
  };

  render() {
    const { classes, loading, hasMore } = this.props;
    const videoListHTML = loading
      ? this.props.videos
          .map((video) => {
            return (
              <ContentPreview
                contentType="video"
                user={video.user}
                id={video._id}
                thumbUrl={video.thumbUrl}
                title={video.title}
                viewCount={video.viewCount}
                uploadedAt={video.uploadedAt}
                key={video._id}
              />
            );
          })
          .concat(
            Array.from({ length: 2 }).map((preview, i) => {
              return <PreviewPlaceholder key={i} />;
            })
          )
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

    return (
      <div className={`${classes.container} content-container`}>
        <div className={`${classes.contentList} content-list`}>
          {videoListHTML}
          <br />
        </div>
        {hasMore && (
          <div>
            <CustomButton text="Load more" onClick={this.loadMore} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(VideoList);
