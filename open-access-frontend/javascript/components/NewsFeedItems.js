import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NewsFeedItem from "./NewsFeedItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

const NewsFeedItems = ({ items, type }) => {
  const classes = useStyles();

  return (
    <Grid container style={{ justifyContent: "center" }}>
      {items.map((item) => {
        item.type = type;
        return <NewsFeedItem key={item._id} item={item} />;
      })}
    </Grid>
  );
};

export default NewsFeedItems;
