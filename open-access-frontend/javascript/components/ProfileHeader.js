import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import dayjs from "dayjs";

import PreviewProfileHeader from "./PreviewProfileHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 32,
  },
  large: {
    width: 100,
    height: 100,
  },
}));

const ProfileHeader = ({
  profilePic,
  username,
  displayName,
  bio,
  country,
  state,
  city,
  joinedAt,
  loading,
}) => {
  const classes = useStyles();

  return loading ? (
    <PreviewProfileHeader />
  ) : (
    <div className={classes.container}>
      <Avatar src={profilePic} className={classes.large} />
      <Typography variant="h4">{displayName}</Typography>
      <Typography variant="body2">@{username}</Typography>
      <Typography variant="body1">{bio}</Typography>
      <Typography variant="body2">
        Member since {dayjs(joinedAt).format("MMM YYYY")}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profilePic: state.user.viewed.profilePic,
  username: state.user.viewed.username,
  displayName: state.user.viewed.displayName,
  bio: state.user.viewed.bio,
  country: state.user.viewed.country,
  state: state.user.viewed.state,
  city: state.user.viewed.city,
  joinedAt: state.user.viewed.joinedAt,
});

export default connect(mapStateToProps)(ProfileHeader);
