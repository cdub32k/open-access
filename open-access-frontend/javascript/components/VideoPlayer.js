import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    width: 800,
    height: 600,
    margin: 24,
    display: "inline-block",
  },
  summary: {
    display: "flex",
    justifyContent: "space-between",
  },
});

class VideoPlayer extends Component {
  render() {
    const { classes, user, url, thumbUrl, title, views, caption } = this.props;
    return (
      <Card className={classes.container}>
        <CardMedia>
          <ReactPlayer
            width={800}
            height={450}
            url={url}
            light={thumbUrl}
            controls
            pip={false}
          />
        </CardMedia>
        <CardHeader
          avatar={<Avatar src={user.profilePic}>R</Avatar>}
          title={
            <span style={{ fontSize: 12 }}>
              <span style={{ fontSize: 18 }}>{title}</span>
              <br />
              by {user.username}
            </span>
          }
          subheader={<span>{views} views</span>}
        />
        <CardContent>{caption}</CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
