import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
    border: `4px solid ${theme.palette.primary.main}`,
    marginBottom: 12,
  },
  text: {
    height: 12,
    width: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    margin: "2px 0",
  },
}));

const PreviewProfileHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Avatar className={classes.large} />
      <div
        className={classes.text}
        style={{ height: 25, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      ></div>
      <div className={classes.text}></div>
      <div className={classes.text}></div>
      <div className={classes.text} style={{ marginTop: 8 }}></div>
    </div>
  );
};

export default PreviewProfileHeader;
