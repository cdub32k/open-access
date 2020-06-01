import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { num2str, date2rel } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    width: 300,
    height: 200,
    borderRadius: 25,
    position: "relative",
    padding: 20,
    marginBottom: 18,
    boxShadow: "0 3px 5px 0 rgba(0,0,0,.4)",
    cursor: "pointer",
  },
  avatar: {
    width: 84,
    height: 84,
    position: "absolute",
    top: 30,
    left: 30,
  },
  userInfo: {
    position: "absolute",
    top: 42,
    left: 132,
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 16,
    left: "48%",
    transform: "translateX(-50%)",
    width: "50%",
  },
  stat: {
    textAlign: "center",
    width: 65,
  },
}));

const NewsFeedItem = ({
  item: {
    id,
    author,
    profilePic,
    uploadedAt,
    type,
    likeCount,
    dislikeCount,
    commentCount,
  },
}) => {
  const classes = useStyles();
  const theme = useTheme();

  let bgL, bgR, f;
  switch (type) {
    case "video":
      f = theme.palette.light.main;
      bgL = theme.palette.alert.main;
      bgR = theme.palette.alert.dark;
      break;
    case "image":
      f = theme.palette.dark.main;
      bgL = theme.palette.secondary.light;
      bgR = theme.palette.secondary.main;
      break;
    case "note":
      f = theme.palette.light.main;
      bgL = theme.palette.primary.main;
      bgR = theme.palette.primary.dark;
      break;
    default:
      break;
  }

  return (
    <Grid
      item
      xs={12}
      className={classes.container}
      style={{
        background: `linear-gradient(45deg, ${bgL} 68%, ${bgR}`,
      }}
    >
      <Avatar className={classes.avatar} src={profilePic} />
      <div className={classes.userInfo}>
        <Typography style={{ color: f }} variant="h5">
          {author}
        </Typography>
        <Typography style={{ color: f }}>
          uploaded a {type} {date2rel(uploadedAt)}
        </Typography>
      </div>
      <div className={classes.stats}>
        <Typography
          className={classes.stat}
          style={{ color: f }}
          variant="caption"
        >
          <div style={{ fontSize: 18 }}>{num2str(likeCount)}</div>
          likes
        </Typography>
        <Typography
          className={classes.stat}
          style={{ color: f }}
          variant="caption"
        >
          <div style={{ fontSize: 18 }}>{num2str(dislikeCount)}</div>
          dislikes
        </Typography>
        <Typography
          className={classes.stat}
          style={{ color: f }}
          variant="caption"
        >
          <div style={{ fontSize: 18 }}>{num2str(commentCount)}</div>
          comments
        </Typography>
      </div>
    </Grid>
  );
};

export default NewsFeedItem;
