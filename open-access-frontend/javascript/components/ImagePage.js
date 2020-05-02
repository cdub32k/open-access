import React, { Component } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import Image_C from "./Image";

class ImagePage extends Component {
  componentDidMount() {
    const { imageId } = this.props.match.params;
    this.props.getImageInfo(imageId);
  }

  render() {
    const {
      user,
      title,
      caption,
      url,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      match: {
        params: { imageId },
      },
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Image_C
            id={imageId}
            user={user}
            title={title}
            caption={caption}
            url={url}
            uploadedAt={uploadedAt}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            commentCount={commentCount}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.image.user,
  title: state.image.title,
  caption: state.image.caption,
  url: state.image.url,
  likeCount: state.image.likeCount,
  dislikeCount: state.image.dislikeCount,
  commentCount: state.image.commentCount,
  uploadedAt: state.image.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getImageInfo: (imageId) =>
    dispatch(ActionCreators.getImageInfoStart(imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
