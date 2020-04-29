import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    width: 300,
    height: "auto",
    margin: 24,
    display: "inline-block",
  },
});

class VideoPlayer extends Component {
  render() {
    const { classes, url, title, width, height } = this.props;
    return (
      <Card className={classes.container}>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          title="VideoTitle"
          subheader="1,230 views"
        />
        <CardMedia>
          <ReactPlayer
            width={width}
            height={height}
            url={url}
            controls
            pip={false}
          />
        </CardMedia>
      </Card>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
