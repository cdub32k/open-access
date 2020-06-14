import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NewsFeedItem from "./NewsFeedItem";
import PreviewNewsfeedItem from "./PreviewNewsfeedItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

const NewsFeedItems = ({ items, type, loading }) => {
  const classes = useStyles();

  const listHtml = loading
    ? items
        .map((item) => {
          item.type = type;
          return <NewsFeedItem key={item._id} item={item} />;
        })
        .concat(
          Array.from({ length: 8 }).map((preview, i) => {
            return <PreviewNewsfeedItem key={i} type={type} />;
          })
        )
    : items.map((item) => {
        item.type = type;
        return <NewsFeedItem key={item._id} item={item} />;
      });

  return (
    <Grid container style={{ justifyContent: "center" }}>
      {listHtml}
    </Grid>
  );
};

export default NewsFeedItems;
