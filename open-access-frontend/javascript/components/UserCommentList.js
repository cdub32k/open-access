import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import UserComment from "./UserComment";
import CustomButton from "./CustomButton";

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

  useEffect(() => {
    loadMore(0);
  }, []);

  const _loadMore = () => {
    loadMore(page + 1);
    setPage(page + 1);
  };

  return (
    <div className="user-comments-list">
      {comments.map((comment, i) => {
        return (
          <UserComment key={i} comment={comment}>
            {comment.body}
          </UserComment>
        );
      })}
      {hasMore && (
        <div>
          <CustomButton text="Load more" onClick={_loadMore} />
        </div>
      )}
    </div>
  );
};

export default UserCommentList;
