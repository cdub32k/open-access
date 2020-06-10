import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

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
  likeLink: {
    margin: "14px 0",
  },
}));

const UserLikeList = ({ loading, likes, hasMore, loadMore }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);

  const _loadMore = () => {
    loadMore(page + 1);
    setPage(page + 1);
  };

  return (
    <div className="user-comments-list">
      {likes.map((like, i) => {
        let link;
        if (like.video) {
          link = (
            <span>
              a video{" "}
              <b>
                <Link to={`/video-player/${like.video._id}`}>
                  {like.video.title}
                </Link>
              </b>
            </span>
          );
        } else if (like.image) {
          link = (
            <span>
              an image{" "}
              <b>
                <Link to={`/image/${like.image._id}`}>{like.image.title}</Link>
              </b>
            </span>
          );
        } else if (like.note) {
          link = (
            <span>
              a{" "}
              <b>
                <Link to={`/note/${like.note._id}`}>note</Link>
              </b>
            </span>
          );
        }
        return (
          <div className={classes.likeLink} key={like._id}>
            {link}
          </div>
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

export default UserLikeList;
