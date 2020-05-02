import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 32,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    width: "50%",
  },
  text: {
    height: 20,
    width: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  large: {
    width: 100,
    height: 100,
  },
}));

const PreviewProfileHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Avatar className={classes.large} />
      <div
        className={classes.text}
        style={{ height: 41, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      ></div>
      <div className={classes.text}></div>
      <div className={classes.text}></div>
      <div className={classes.text}></div>
    </div>
  );
};

export default PreviewProfileHeader;
