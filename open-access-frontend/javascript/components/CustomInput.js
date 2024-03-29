import React, { memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textarea: {
    flexGrow: 1,
    maxWidth: 600,
    width: "100%",
  },
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
  multiline: {
    width: "100%",
  },
  textarea: {
    color: theme.palette.dark.main,
    width: "100%",
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

const CustomInput = ({ value, name, label, onChange, multiline, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl
      className={multiline ? classes.textareaContainer : classes.control}
      fullWidth={true}
    >
      <TextField
        className={multiline ? classes.multiline : classes.textField}
        InputProps={{ className: multiline ? classes.textarea : classes.input }}
        InputLabelProps={{ className: classes.inputLabel }}
        variant="outlined"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        multiline={multiline}
        {...rest}
      />
    </FormControl>
  );
};

export default memo(CustomInput);
