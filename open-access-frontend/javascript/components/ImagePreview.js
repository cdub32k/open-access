import React, { Component } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

import { num2str, date2rel } from "../util/helpers";

const styles = (theme) => ({
  container: {
    position: "relative",
    margin: 12,
    display: "inline-block",
    width: 240,
    height: 240,
  },
  img: {
    width: 240,
    height: 240,
  },
});

class ImagePreview extends Component {
  render() {
    const { classes, id, user, url, caption, uploadedAt } = this.props;
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
