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
import CustomButton from "./CustomButton";

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

const NewsFeed = ({
  loadNewsfeedVideos,
  loadNewsfeedImages,
  loadNewsfeedNotes,
  loadMoreVideo,
  loadMoreImages,
  loadMoreNotes,
  newsfeedVideoSubscriptions,
  newsfeedImageSubscriptions,
  newsfeedNoteSubscriptions,
  videos,
  images,
  notes,
}) => {
  const [tab, setTab] = useState(0);
  const changeTab = (e, newValue) => {
    if (newValue == 1 && images.length == 0) loadNewsfeedImages();
    if (newValue == 2 && notes.length == 0) loadNewsfeedNotes();

    setTab(newValue);
  };

  const classes = useStyles();
  useEffect(() => {
    if (videos.length == 0) loadNewsfeedVideos();
    return () => {
      newsfeedVideoSubscriptions.forEach((sub) => sub.unsubscribe());
      newsfeedImageSubscriptions.forEach((sub) => sub.unsubscribe());
      newsfeedNoteSubscriptions.forEach((sub) => sub.unsubscribe());
    };
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
          <NewsFeedItems items={videos} type="video" />
          <CustomButton text="Load more" onClick={loadMoreVideo} />
        </TabPanel>
        <TabPanel selectedTab={tab} index={1}>
          <NewsFeedItems items={images} type="image" />
          <CustomButton text="Load more" onClick={loadMoreImages} />
        </TabPanel>
        <TabPanel selectedTab={tab} index={2}>
          <NewsFeedItems items={notes} type="note" />
          <CustomButton text="Load more" onClick={loadMoreNotes} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  videos: state.user.newsfeed.videos,
  images: state.user.newsfeed.images,
  notes: state.user.newsfeed.notes,
  newsfeedVideoSubscriptions: state.user.newsfeed.videoSubscriptions,
  newsfeedImageSubscriptions: state.user.newsfeed.imageSubscriptions,
  newsfeedNoteSubscriptions: state.user.newsfeed.noteSubscriptions,
});

const mapDispatchToProps = (dispatch) => ({
  loadNewsfeedVideos: () => dispatch(ActionCreators.loadNewsfeedVideoStart()),
  loadNewsfeedImages: () => dispatch(ActionCreators.loadNewsfeedImagesStart()),
  loadNewsfeedNotes: () => dispatch(ActionCreators.loadNewsfeedNotesStart()),
  loadMoreVideo: () => dispatch(ActionCreators.loadMoreNewsfeedVideo()),
  loadMoreImages: () => dispatch(ActionCreators.loadMoreNewsfeedImages()),
  loadMoreNotes: () => dispatch(ActionCreators.loadMoreNewsfeedNotes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
