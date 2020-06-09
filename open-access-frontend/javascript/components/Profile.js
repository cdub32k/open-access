import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

import ProfileHeader from "./ProfileHeader";
import VideoList from "./VideoList";
import ImageList from "./ImageList";
import NoteList from "./NoteList";
import UserCommentList from "./UserCommentList";
import CustomButton from "./CustomButton";
import TabPanel from "./TabPanel";

import { num2str } from "../utils/helpers";

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
      videoCount,
      loadUserImagePage,
      imageCount,
      loadUserNotePage,
      noteCount,
      loadUserCommentsPage,
      comments,
      commentCount,
      mineUsername,
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
          <Tab label={`Videos (${num2str(videoCount)})`} />
          <Tab label={`Images (${num2str(imageCount)})`} />
          <Tab label={`Notes (${num2str(noteCount)})`} />
          <Tab label={`Comments (${num2str(commentCount)})`} />
        </Tabs>
        <TabPanel selectedTab={selectedTab} index={0}>
          {mineUsername == username && (
            <Link to="/video-upload">
              <CustomButton text="+New Video" />
            </Link>
          )}
          <VideoList
            hasMore={videoCount > videos.length}
            loadMore={(page) => loadUserVideoPage(username, page)}
            videos={videos}
            loading={loading}
          />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          {mineUsername == username && (
            <Link to="/image-upload">
              <CustomButton text="+New Image" />
            </Link>
          )}
          <ImageList
            hasMore={imageCount > images.length}
            loadMore={(page) => loadUserImagePage(username, page)}
            images={images}
            loading={loading}
          />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={2}>
          {mineUsername == username && (
            <Link to="/note-upload">
              <CustomButton text="+New Note" />
            </Link>
          )}
          <NoteList
            hasMore={noteCount > notes.length}
            loadMore={(page) => loadUserNotePage(username, page)}
            notes={notes}
            loading={loading}
          />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={3}>
          <UserCommentList
            hasMore={commentCount > comments.length}
            loadMore={(page) => loadUserCommentsPage(username, page)}
            comments={comments}
            loading={loading}
          />
        </TabPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mineUsername: state.user.username,
  loading: state.user.viewed.loading,
  username: state.user.viewed.username,
  videos: state.user.viewed.videos,
  images: state.user.viewed.images,
  notes: state.user.viewed.notes,
  videoCount: state.user.viewed.videoCount,
  imageCount: state.user.viewed.imageCount,
  noteCount: state.user.viewed.noteCount,
  commentCount: state.user.viewed.commentCount,
  comments: state.user.viewed.comments,
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
  loadUserCommentsPage: (username, page) =>
    dispatch(ActionCreators.loadUserCommentsPageStart(username, page)),
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
