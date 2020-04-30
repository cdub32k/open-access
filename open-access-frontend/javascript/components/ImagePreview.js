import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    margin: 24,
    display: "inline-block",
  },
  img: {
    width: 320,
    height: 320,
  },
});

class ImagePreview extends Component {
  render() {
    const { classes, id, url, title } = this.props;
    return (
      <Link to={`/image/${id}`}>
        <Card className={classes.container}>
          <CardMedia className={classes.img} image={url}></CardMedia>
        </Card>
      </Link>
    );
  }
}

export default withStyles(styles)(ImagePreview);
