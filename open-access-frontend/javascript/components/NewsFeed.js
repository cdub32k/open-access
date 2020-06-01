import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NewsFeedItems from "./NewsFeedItems";

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

const NewsFeed = ({ loadNewsfeed, items }) => {
  const classes = useStyles();
  useEffect(() => {
    loadNewsfeed();
  }, []);

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

const mapStateToProps = (state) => ({
  items: state.user.newsfeed.items,
  newsfeedSubscription: state.user.newsfeed.subscription,
});

const mapDispatchToProps = (dispatch) => ({
  loadNewsfeed: () => dispatch(ActionCreators.loadNewsfeedStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
