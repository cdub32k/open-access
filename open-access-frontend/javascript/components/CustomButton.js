import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    maxWidth: 225,
    color: theme.palette.text.light,
  },
}));

const CustomButton = ({ onClick, text, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.button}
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
