import React, { useState } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";

import CustomButton from "./CustomButton";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "50%",
  },
  menu: {},
  dialog: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: 10,
  },
}));

const OwnerActions = ({ _id, type, username, deleteComment, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteMedia = () => {
    let path;
    let redirect = false;
    switch (type) {
      case "video":
        path = `/videos/${_id}`;
        redirect = true;
        break;
      case "image":
        path = `/images/${_id}`;
        redirect = true;
        break;
      case "note":
        path = `/notes/${_id}`;
        redirect = true;
      case "videoComment":
        path = `/videos/comments/${_id}`;
        break;
      case "imageComment":
        path = `/images/comments/${_id}`;
        break;
      case "noteComment":
        path = `/notes/comments/${_id}`;
        break;
    }
    axios
      .delete(path)
      .then((res) => {
        if (redirect) setGoToProfile(true);
        else {
          deleteComment(type, _id);
          setConfirmOpen(false);
          handleClose();
        }
      })
      .catch((error) => {
        setConfirmOpen(false);
        handleClose();
      });
  };

  const confirmClose = () => {
    setConfirmOpen(false);
    handleClose();
  };

  if (goToProfile) return <Redirect to={`/profile/${username}`} />;

  return (
    <div {...rest}>
      <IconButton onClick={handleClick} color="inherit">
        <MoreIcon className={classes.icon} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => {}}>edit</MenuItem>
        <MenuItem onClick={() => setConfirmOpen(true)}>delete</MenuItem>
      </Menu>

      <Dialog
        className={classes.dialog}
        onClose={confirmClose}
        open={confirmOpen}
      >
        <DialogTitle>Confirm delete media</DialogTitle>
        <div className={classes.dialogActions}>
          <CustomButton
            style={{
              backgroundColor: theme.palette.alert.main,
              color: theme.palette.light.main,
            }}
            text="DELETE"
            onClick={deleteMedia}
          />
          <CustomButton text="cancel" onClick={confirmClose} />
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (type, _id) =>
    dispatch(ActionCreators.deleteComment(type, _id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerActions);
