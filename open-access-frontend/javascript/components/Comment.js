import React, { useState } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { Link } from "react-router-dom";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { date2rel } from "../utils/helpers";

import CustomInput from "./CustomInput";
import MediaOwnerActions from "./MediaOwnerActions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    marginBottom: 32,
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    wordBreak: "break-word",
  },
  userInfo: {
    marginBottom: 12,
  },
  ownerActions: {
    position: "absolute",
    right: 10,
    top: -14,
  },
}));

const Comment = ({
  _id,
  body,
  user,
  createdAt,
  type,
  mineUsername,
  updateComment,
}) => {
  const classes = useStyles();
  const [newBody, setNewBody] = useState(body);

  const update = () => {
    let path;
    switch (type) {
      case "video":
        path = `/videos/comments/${_id}`;
        break;
      case "image":
        path = `/images/comments/${_id}`;
        break;
      case "note":
        path = `/notes/comments/${_id}`;
    }

    return axios.put(path, { body: newBody }).then((res) => {
      updateComment(type, _id, newBody);
    });
  };

  return (
    <article className={classes.container}>
      <Link to={`/profile/${user.username}`}>
        <Avatar src={user.profilePic} className={classes.avatar} />
      </Link>
      <div className={classes.textSection}>
        <Typography className={classes.userInfo} variant="body2">
          <Link to={`/profile/${user.username}`}>
            <b>@{user.username}</b>
          </Link>
          &nbsp;&#8226;&nbsp;{date2rel(createdAt)}
        </Typography>
        <Typography style={{ whiteSpace: "pre-wrap" }} variant="body1">
          {body}
        </Typography>
      </div>
      {user.username == mineUsername && (
        <MediaOwnerActions
          className={classes.ownerActions}
          _id={_id}
          type={type + "Comment"}
          editTitle={"Edit Comment"}
          editForm={
            <CustomInput
              name="body"
              value={newBody}
              multiline={true}
              onChange={(e) => setNewBody(e.target.value)}
            />
          }
          editCallback={update}
        />
      )}
    </article>
  );
};

const mapStateToProps = (state) => ({
  mineUsername: state.user.username,
});
const mapDispatchToProps = (dispatch) => ({
  updateComment: (type, _id, body) =>
    dispatch(ActionCreators.updateComment(type, _id, body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
