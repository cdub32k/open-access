import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    margin: 24,
    display: "inline-block",
    width: 320,
  },
});

class Image_C extends Component {
  render() {
    const { classes, user, body, width, height } = this.props;
    return (
      <Card className={classes.container}>
        <CardHeader
          avatar={<Avatar src={user.profilePic} />}
          title={<span style={{ fontSize: 12 }}>by {user.username}</span>}
        />
        <CardContent>{body}</CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Image_C);
