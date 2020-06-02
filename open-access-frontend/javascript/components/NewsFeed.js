import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import NewsFeedItems from "./NewsFeedItems";
import TabPanel from "./TabPanel";

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
  tabHeaders: {
    marginBottom: 24,
    justifyContent: "center",
  },
}));

const NewsFeed = ({ loadNewsfeed, videos, images, notes }) => {
  const [tab, setTab] = useState(0);
  const changeTab = (e, newValue) => {
    setTab(newValue);
  };

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
        <Tabs
          value={tab}
          onChange={changeTab}
          indicatorColor="primary"
          textColor="inherit"
          centered={true}
          className={classes.tabHeaders}
        >
          <Tab label="Videos" />
          <Tab label="Images" />
          <Tab label="Notes" />
        </Tabs>
        <TabPanel selectedTab={tab} index={0}>
          <NewsFeedItems items={videos} />
        </TabPanel>
        <TabPanel selectedTab={tab} index={1}>
          <NewsFeedItems items={images} />
        </TabPanel>
        <TabPanel selectedTab={tab} index={2}>
          <NewsFeedItems items={notes} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  videos: state.user.newsfeed.videos,
  images: state.user.newsfeed.images,
  notes: state.user.newsfeed.notes,
  newsfeedSubscription: state.user.newsfeed.subscription,
});

const mapDispatchToProps = (dispatch) => ({
  loadNewsfeed: () => dispatch(ActionCreators.loadNewsfeedStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
