import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  playerContainer: {
    position: "relative",
    width: 300,
    height: "auto",
    margin: 24,
    display: "inline-block",
  },
});

class VideoPlayer extends Component {
  render() {
    const { classes, username, url, title, width, height } = this.props;
    return (
      <div className={classes.playerContainer}>
        <ReactPlayer width={width} height={height} url={url} controls />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.user.username,
});

export default withStyles(styles)(connect(mapStateToProps)(VideoPlayer));
