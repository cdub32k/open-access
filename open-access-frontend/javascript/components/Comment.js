import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { date2rel } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginBottom: 32,
  },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-word",
  },
  userInfo: {
    marginBottom: 12,
  },
}));

const Comment = ({ body, user, createdAt }) => {
  const classes = useStyles();

  return (
    <article className={classes.container}>
      <Link to={`/profile/${user.username}`}>
        <Avatar src={user.profilePic} className={classes.avatar} />
      </Link>
      <div className={classes.textSection}>
        <Typography className={classes.userInfo} variant="body2">
          <Link to={`/profile/${user.username}`}>
            <b>@{user.username}</b>
          </Link>
          &nbsp;&#8226;&nbsp;{date2rel(createdAt)}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </div>
    </article>
  );
};

export default Comment;
