import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import dayjs from "dayjs";

import PreviewProfileHeader from "./PreviewProfileHeader";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    border: `4px solid ${theme.palette.primary.main}`,
    width: 280,
    height: 280,
    backgroundColor: theme.palette.background.main,
  },
  large: {
    width: 100,
    height: 100,
    border: `4px solid ${theme.palette.secondary.main}`,
    marginBottom: 12,
    cursor: "pointer",
  },
  bio: {
    margin: "12px 0",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: `4px solid ${theme.palette.secondary.main}`,
    boxShadow: theme.shadows[5],
    padding: 0,
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading ? (
    <PreviewProfileHeader />
  ) : (
    <div className={classes.container}>
      <Avatar src={profilePic} onClick={handleOpen} className={classes.large} />
      <Typography variant="h4">{displayName}</Typography>
      <Typography variant="body2">@{username}</Typography>
      <Typography variant="body2">
        Member since {dayjs(joinedAt).format("MMM YYYY")}
      </Typography>
      <Typography variant="body1" className={classes.bio}>
        {bio}
      </Typography>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={profilePic} width="300" height="300" />
          </div>
        </Fade>
      </Modal>
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
