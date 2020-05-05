import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: `${theme.spacing(2)}px 0`,
  },
  input: {
    color: theme.palette.dark,
  },
}));

const CustomInput = ({ value, name, label, onChange, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth={true}>
      <TextField
        className={classes.textField}
        InputProps={{ className: classes.input }}
        variant="outlined"
        value={value}
        name={name}
        label={label}
        onChange={onChange}
        {...rest}
      />
    </FormControl>
  );
};

export default CustomInput;
