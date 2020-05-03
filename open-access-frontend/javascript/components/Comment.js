import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { date2rel } from "../util/helpers";

const Comment = ({ body, user, createdAt }) => (
  <article className="center mw5 mw6-ns hidden ba mv4">
    <div className="bg-purple white mv0 pv2 ph3 flex items-center">
      <Avatar src={user.profilePic} className="mr3" />
      <Typography variant="subtitle2">
        @{user.username} &#8226; {date2rel(createdAt)}
      </Typography>
    </div>
    <div className="pa3 bt flex items-center">
      <Typography variant="body2">{body}</Typography>
    </div>
  </article>
);

export default Comment;
