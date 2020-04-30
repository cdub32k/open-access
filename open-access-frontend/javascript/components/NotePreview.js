import React, { Component } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  container: {
    position: "relative",
    margin: 24,
    display: "inline-block",
    width: 320,
    maxHeight: 320,
  },
});

class NotePreview extends Component {
  render() {
    const { classes, id, body } = this.props;
    return (
      <Link to={`/note/${id}`}>
        <Card className={classes.container}>
          <CardHeader title={body} />
        </Card>
      </Link>
    );
  }
}

export default withStyles(styles)(NotePreview);
