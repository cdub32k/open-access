import React, { useState, useRef } from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carousel: {},
  slides: {
    width: 1020,
    whiteSpace: "nowrap",
    overflow: "hidden",
    margin: "auto",
    pointerEvents: "none",
  },
  slide: {
    height: 300,
    width: 300,
    margin: 20,
    backgroundColor: theme.palette.secondary.main,
    display: "inline-block",
  },
  arrows: {},
  left: {
    cursor: "pointer",
  },
  right: {
    cursor: "pointer",
  },
}));

const Carousel = (props) => {
  const classes = useStyles();

  const [slide, setSlide] = useState(0);
  const slides = useRef();

  const switchSlides = (back) => {
    if (!back) {
      let c = Math.min(slide + 1, 6);
      setSlide(c);

      slides.current.scrollTo({
        left: c * 340,
        behavior: "smooth",
      });
    } else {
      let c = Math.max(slide - 1, 0);
      setSlide(c);

      slides.current.scrollTo({
        left: c * 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={classes.carousel}>
      <div className={classes.slides} ref={slides}>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
        <div className={classes.slide}></div>
      </div>
      <div className={classes.arrows}>
        <div className={classes.left} onClick={() => switchSlides(true)}>
          <ArrowBackIcon size="small" />
        </div>
        <div className={classes.right}>
          <ArrowForwardIcon size="small" onClick={() => switchSlides()} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
