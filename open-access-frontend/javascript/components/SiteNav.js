import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const SiteNav = ({ loggedIn, username }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography color="inherit" variant="h6" className={classes.title}>
          <Link to="/" style={{ color: "inherit" }}>
            Open Acess
          </Link>
        </Typography>
        {!loggedIn && (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/sign-up">
              Register
            </Button>
          </Fragment>
        )}
        {loggedIn && (
          <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  username: state.user.username,
});
export default connect(mapStateToProps)(SiteNav);
