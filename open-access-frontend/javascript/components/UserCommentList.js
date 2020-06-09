import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import UserComment from "./UserComment";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    margin: "32px 0",
  },
  contentList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 1260,
    padding: 0,
  },
}));

const UserCommentList = ({ loading, comments, hasMore, loadMore }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  return (
    <div>
      {comments.map((comment, i) => {
        return (
          <UserComment key={i} comment={comment}>
            {comment.body}
          </UserComment>
        );
      })}
    </div>
  );
};

export default UserCommentList;
