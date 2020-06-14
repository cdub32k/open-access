import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  control: {
    flexGrow: 1,
    maxWidth: 600,
    width: "100%",
    height: 40,
  },
  textField: {
    width: "100%",
    height: 40,
  },
  input: {
    color: theme.palette.dark.main,
    height: 40,
    width: "100%",
    "& input": {
      padding: 13,
    },
  },
  inputLabel: {
    height: 40,
    transform: "translate(14px, 14px) scale(1);",
    "&:focused": {
      transform: "translate(14px, 0px) scale(.8);",
    },
  },
}));

const CustomInput = ({ value, name, label, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.control} fullWidth={true}>
      <TextField
        className={classes.textField}
        InputProps={{ className: classes.input }}
        InputLabelProps={{ className: classes.inputLabel }}
        variant="outlined"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </FormControl>
  );
};

export default CustomInput;
