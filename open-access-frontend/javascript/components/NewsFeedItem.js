import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { num2str, date2rel } from "../utils/helpers";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "12px 0",
  },
  media: {
    height: 194,
  },
  content: {
    maxHeight: 112,
  },
  stats: {
    display: "flex",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    padding: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 8,
  },
});

const NewsFeedItem = ({
  item: {
    id,
    username,
    profilePic,
    uploadedAt,
    type,
    title,
    caption,
    likeCount,
    dislikeCount,
    commentCount,
    thumbUrl,
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
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent className={classes.actions}>
          <Avatar src={profilePic} className={classes.avatar} />
          <div>
            <Typography variant="body2" className={classes.userInfo}>
              <b>{username}</b> posted a {type} {date2rel(uploadedAt)}
            </Typography>
            <div className={classes.stats}>
              <Typography variant="body2">
                <b>{num2str(likeCount)}</b> likes&nbsp;•&nbsp;
              </Typography>
              <Typography variant="body2">
                <b>{num2str(dislikeCount)}</b> dislikes&nbsp;•&nbsp;
              </Typography>
              <Typography variant="body2">
                <b>{num2str(commentCount)}</b> comments
              </Typography>
            </div>
          </div>
        </CardContent>
        {type != "note" && (
          <CardMedia
            className={classes.media}
            style={{ height: type == "image" ? 354 : 194 }}
            image={thumbUrl}
            title={title}
          />
        )}
        {type != "image" && (
          <CardContent
            className={classes.content}
            style={{
              background: `linear-gradient(45deg, ${bgL} 68%, ${bgR})`,
              maxHeight: type == "note" ? 345 : 112,
            }}
          >
            <Typography
              style={{ color: f }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
            <Typography
              style={{ color: f }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {caption}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default NewsFeedItem;
