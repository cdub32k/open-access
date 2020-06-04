import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 8,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    maxWidth: 225,
    minWidth: 100,
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
