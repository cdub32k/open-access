import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    margin: 24,
    display: "inline-block",
  },
  img: {
    width: 600,
    height: 600,
  },
});

class Image_C extends Component {
  render() {
    const { classes, user, url, title, caption } = this.props;
    return (
      <Card className={classes.container}>
        <CardMedia className={classes.img} image={url}></CardMedia>
        <CardHeader
          avatar={<Avatar src={user.profilePic} />}
          title={
            <span style={{ fontSize: 12 }}>
              <span style={{ fontSize: 18 }}>{title}</span>
              <br />
              by {user.username}
            </span>
          }
          subheader={caption}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(Image_C);
