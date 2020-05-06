import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

import ProfileHeader from "./ProfileHeader";
import VideoList from "./VideoList";
import ImageList from "./ImageList";
import NoteList from "./NoteList";
import CustomButton from "./CustomButton";

const TabPanel = withStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  hide: {
    display: "none",
  },
}))(({ classes, children, index, selectedTab }) => {
  return (
    <Box
      className={`${classes.container} ${
        index != selectedTab ? classes.hide : ""
      }`}
    >
      {children}
    </Box>
  );
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
    };
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getUserInfo(username);
  }

  componentWillUnmount() {
    this.props.clearUserData();
  }

  changeTab(e, newValue) {
    this.setState({
      selectedTab: newValue,
    });
  }

  render() {
    const { username } = this.props.match.params;
    const {
      loading,
      classes,
      videos,
      images,
      notes,
      loadUserVideoPage,
      hasMoreVideos,
      loadUserImagePage,
      hasMoreImages,
      loadUserNotePage,
      hasMoreNotes,
    } = this.props;
    const { selectedTab } = this.state;
    return (
      <div className={classes.container}>
        <ProfileHeader loading={loading} />
        <Tabs
          value={selectedTab}
          onChange={this.changeTab}
          indicatorColor="primary"
          textColor="inherit"
          className={classes.tabHeaders}
        >
          <Tab label="Videos" />
          <Tab label="Images" />
          <Tab label="Notes" />
        </Tabs>
        <TabPanel selectedTab={selectedTab} index={0}>
          <Link to="/video-upload">
            <CustomButton text="+New Video" />
          </Link>
          <VideoList
            hasMore={hasMoreVideos}
            loadMore={(page) => loadUserVideoPage(username, page)}
            videos={videos}
            loading={loading}
          />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          <Link to="/image-upload">
            <CustomButton text="+New Image" />
          </Link>
          <ImageList
            hasMore={hasMoreImages}
            loadMore={(page) => loadUserImagePage(username, page)}
            images={images}
            loading={loading}
          />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={2}>
          <Link to="/note-upload">
            <CustomButton text="+New Note" />
          </Link>
          <NoteList
            hasMore={hasMoreNotes}
            loadMore={(page) => loadUserNotePage(username, page)}
            notes={notes}
            loading={loading}
          />
        </TabPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.viewed.loading,
  username: state.user.viewed.username,
  videos: state.user.viewed.videos,
  images: state.user.viewed.images,
  notes: state.user.viewed.notes,
  hasMoreVideos: state.user.viewed.hasMoreVideos,
  hasMoreImages: state.user.viewed.hasMoreImages,
  hasMoreNotes: state.user.viewed.hasMoreNotes,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: (username) =>
    dispatch(ActionCreators.getUserInfoStart(username)),
  clearUserData: () => {
    dispatch(ActionCreators.clearUserData());
  },
  loadUserVideoPage: (username, page) =>
    dispatch(ActionCreators.loadUserVideoPageStart(username, page)),
  loadUserImagePage: (username, page) =>
    dispatch(ActionCreators.loadUserImagePageStart(username, page)),
  loadUserNotePage: (username, page) =>
    dispatch(ActionCreators.loadUserNotePageStart(username, page)),
});

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tabHeaders: {
    marginBottom: 24,
  },
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
