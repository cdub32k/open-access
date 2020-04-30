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
    const { title, caption, url, uploadedAt } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} md={8}>
          <Image_C
            title={title}
            caption={caption}
            url={url}
            uploadedAt={uploadedAt}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.image.title,
  caption: state.image.caption,
  url: state.image.url,
  uploadedAt: state.image.uploadedAt,
});

const mapDispatchToProps = (dispatch) => ({
  getImageInfo: (imageId) =>
    dispatch(ActionCreators.getImageInfoStart(imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);
