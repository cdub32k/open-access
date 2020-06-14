import React, { Component } from "react";

import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

import { num2str, date2rel } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    height: 240,
    width: 300,
    margin: "18px 6px",
    display: "inline-block",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  thumb: {
    height: 169,
    width: 300,
  },
  previewDetailsContainer: {
    position: "absolute",
    width: "100%",
    height: 72,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    height: 44,
    width: "50%",
    lineHeight: 0,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  previewDetails: {
    display: "flex",
    justifyContent: "space-between",
    height: 22,
    width: "75%",
    marginTop: 8,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
}));

const PreviewPlaceholder = () => {
  const classes = useStyles();
  return (
    <Card className={`${classes.container} content-preview`}>
      <CardContent className={classes.thumb} />
      <CardHeader
        className={classes.previewDetailsContainer}
        avatar={<Avatar />}
        title={<span className={classes.title}></span>}
        subheader={
          <div className={classes.previewDetails}>
            <div></div>
            <div></div>
          </div>
        }
      />
    </Card>
  );
};

export default PreviewPlaceholder;
