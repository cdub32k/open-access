import React from "react";

import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { withStyles } from "@material-ui/core/styles";

import { num2str } from "../util/helpers";

const styles = (theme) => ({
  metric: {
    fontSize: 14,
    marginRight: 12,
  },
});

const ContentActions = ({
  classes,
  contentType,
  liked,
  disliked,
  likeCount,
  dislikeCount,
  commentCount,
  like,
  dislike,
}) => {
  return (
    <CardActions disableSpacing>
      <IconButton onClick={like}>
        <FavoriteIcon />
      </IconButton>
      <span className={classes.metric}>{num2str(likeCount)}</span>
      <IconButton onClick={dislike}>
        <ThumbDownIcon />
      </IconButton>
      <span className={classes.metric}>{num2str(dislikeCount)}</span>
      <IconButton>
        <AddCommentIcon />
      </IconButton>
      <span className={classes.metric}>{num2str(commentCount)}</span>
    </CardActions>
  );
};

export default withStyles(styles)(ContentActions);
