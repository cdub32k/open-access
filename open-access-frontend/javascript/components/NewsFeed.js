import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NewsFeedItems from "./NewsFeedItems";

const items = [
  {
    _id: 1,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "video",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 2,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "image",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 3,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "note",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 4,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "note",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 5,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "image",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 6,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "video",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 7,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "video",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 8,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "note",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 9,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "note",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 10,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "image",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
  {
    _id: 11,
    author: "@first_member",
    profilePic: "http://localhost:5000/img/default-profile.png",
    uploadedAt: Date(),
    type: "note",
    likeCount: 4,
    dislikeCount: 3,
    commentCount: 12,
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    marginBottom: 18,
  },
}));

const NewsFeed = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.header} variant="h4">
          NewsFeed
        </Typography>
        <NewsFeedItems items={items} />
      </Grid>
    </Grid>
  );
};

export default NewsFeed;
