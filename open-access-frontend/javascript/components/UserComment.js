import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { date2rel } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 48,
  },
  body: {
    margin: "10px 0",
  },
}));

const UserComment = ({ comment }) => {
  const classes = useStyles();

  let mediaTitle;
  if (comment.video) {
    mediaTitle = comment.video.title;
  } else if (comment.image) {
    mediaTitle = comment.image.title;
  } else if (comment.note) {
    mediaTitle = "a note";
  }

  return (
    <div className={classes.container}>
      {comment.replyId ? (
        <Typography variant="body1">
          <Link to={`/`}>replied</Link> to a <Link to={`/`}>comment</Link> on{" "}
          <Link to={`/`}>{mediaTitle}</Link>
        </Typography>
      ) : (
        <Typography variant="body1">
          <Link to={`/`}>commented</Link> on <Link to={`/`}>{mediaTitle}</Link>
        </Typography>
      )}
      <Typography className={classes.body} variant="body1">
        {comment.body}
      </Typography>
      <Typography variant="body2">{date2rel(comment.createdAt)}</Typography>
    </div>
  );
};

export default UserComment;
