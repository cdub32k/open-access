import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  control: {
    flexGrow: 1,
    maxWidth: 600,
  },
  textField: {
    width: "100%",
    margin: "12px 0",
  },
  input: {
    color: theme.palette.dark.main,
  },
}));

const CustomInput = ({ value, name, label, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.control} fullWidth={true}>
      <TextField
        className={classes.textField}
        InputProps={{ className: classes.input }}
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
