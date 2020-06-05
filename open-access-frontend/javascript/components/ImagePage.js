import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";

import Image_C from "./Image";
import PreviewImage from "./PreviewImage";
import CommentsSection from "./CommentsSection";
import MediaOwnerActions from "./MediaOwnerActions";

class ImagePage extends Component {
  componentDidMount() {
    const { imageId } = this.props.match.params;
    this.props.getImageInfo(imageId);
  }

  componentWillUnmount() {
    this.props.clearImageData();
  }

  render() {
    const {
      loading,
      user,
      title,
      caption,
      url,
      likeCount,
      dislikeCount,
      commentCount,
      uploadedAt,
      liked,
      disliked,
      comments,
      match: {
        params: { imageId },
      },
      mineUsername,
    } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8} style={{ paddingRight: 32 }}>
          {loading ? (
            <PreviewImage />
          ) : (
            <Fragment>
              <Image_C
                _id={imageId}
                user={user}
                title={title}
                caption={caption}
                url={url}
                uploadedAt={uploadedAt}
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                commentCount={commentCount}
                liked={liked}
                disliked={disliked}
              />
              {user.username == mineUsername && (
                <MediaOwnerActions _id={imageId} type="image" />
              )}
            </Fragment>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <CommentsSection
            comments={comments}
            contentType="image"
            id={imageId}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.image.loading,
  user: state.image.user,
  title: state.image.title,
  caption: state.image.caption,
  url: state.image.url,
  likeCount: state.image.likeCount,
  dislikeCount: state.image.dislikeCount,
  commentCount: state.image.commentCount,
  uploadedAt: state.image.uploadedAt,
  liked: state.image.liked,
  disliked: state.image.disliked,
  comments: state.image.comments,
  mineUsername: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getImageInfo: (imageId) =>
    dispatch(ActionCreators.getImageInfoStart(imageId)),
  clearImageData: () => dispatch(ActionCreators.clearImageData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
