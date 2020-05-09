import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { date2rel } from "../utils/helpers";

const Comment = ({ body, user, createdAt }) => (
  <article className="center mw5 mw6-ns hidden mv4">
    <div
      className="b-gold white mv0 pv1 flex items-center br-pill"
      style={{ paddingLeft: 6 }}
    >
      <Avatar
        src={user.profilePic}
        className="mr3"
        style={{ width: 32, height: 32 }}
      />
      <Typography variant="subtitle2">
        @{user.username} &#8226; {date2rel(createdAt)}
      </Typography>
    </div>
    <div className="pa2 flex items-center">
      <Typography variant="body1">{body}</Typography>
    </div>
  </article>
);

export default Comment;
