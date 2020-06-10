import React, { Component } from "react";
import { connect } from "react-redux";

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
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 1260,
    padding: 0,
  },
});

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePage: 0,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore(0);
  }

  loadMore = () => {
    this.props.loadMore(this.state.imagePage + 1);
    this.setState({
      imagePage: this.state.imagePage + 1,
    });
  };

  render() {
    const { classes, loading, hasMore } = this.props;

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

    return (
      <div className={classes.container}>
        <div className={classes.contentList}>{imageListHTML}</div>
        {hasMore && (
          <div>
            <CustomButton text="Load more" onClick={this.loadMore} />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ImageList);
