import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { makeStyles } from "@material-ui/core/styles";

import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "200px 150px",
  },
  caption: {
    color: theme.palette.primary.main,
    marginBottom: 18,
  },
  input: {
    margin: "24px 24px 24px 0",
  },
  icon: {
    color: theme.palette.dark.main,
    marginRight: 12,
    fontSize: 44,
    marginTop: 40,
    cursor: "pointer",
  },
}));

const HomeHero4 = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Typography className={classes.caption} variant="caption">
          Stay Tuned!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">Subscribe to our newsletter</Typography>
      </Grid>
      <Grid className={classes.input} item xs={12}>
        <Grid container>
          <CustomInput size="medium" placeholder="Enter Your Email" />
          &nbsp;&nbsp;
          <CustomButton
            size="large"
            text="Subscribe"
            style={{ display: "inline-block" }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <TwitterIcon className={classes.icon} fontSize="large" />
          <FacebookIcon className={classes.icon} fontSize="large" />
          <InstagramIcon className={classes.icon} fontSize="large" />
          <YouTubeIcon className={classes.icon} fontSize="large" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeHero4;
