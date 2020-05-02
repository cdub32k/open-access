import React, { Component } from "react";
import ReactPlayer from "react-player";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

import ContentActions from "./ContentActions";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "calc(100% - 48px);",
    margin: 24,
    display: "inline-block",
  },
  text: {
    height: 19,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    margin: "4px 0",
  },
  playerContainer: {
    paddingBottom: "56.25%",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}));

const PreviewVideoPlayer = () => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <div className={classes.playerContainer}></div>
      <CardHeader
        avatar={<Avatar>R</Avatar>}
        title={
          <div>
            <div className={classes.text}></div>
            <div className={classes.text} style={{ width: "25%" }}></div>
            <div className={classes.text} style={{ width: "25%" }}></div>
          </div>
        }
      />
      <CardContent style={{ paddingTop: 0 }}>
        <div className={classes.text} style={{ width: "25%" }}></div>
        <div className={classes.text}></div>
      </CardContent>
      <ContentActions />
    </Card>
  );
};

export default PreviewVideoPlayer;
