import React, { Fragment, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: "transparent",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.secondary.main,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    ...theme.globalClasses,
  };
});

const SiteNav = ({ loggedIn, username, notifications }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifsAnchorEl, setNotifsAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotifsMenuOpen = Boolean(notifsAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotifsMenuOpen = (event) => {
    setNotifsAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/profile/${username}`}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/my-account">
        My account
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/logout">
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotifsMenuOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge
            badgeContent={notifications.length}
            classes={{ badge: classes.badge }}
            max={99}
          >
            <NotificationsIcon className={classes.icon} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle className={classes.icon} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderNotifsMenu = (
    <Menu
      anchorEl={notifsAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotifsMenuOpen}
      onClose={handleMenuClose}
    >
      {notifications.map((notif, i) => {
        let contentUrl = "";
        switch (notif.type) {
          case "note":
            contentUrl = "/note/" + notif.targetId;
            break;
          case "image":
            contentUrl = "/image/" + notif.targetId;
            break;
          case "video":
            contentUrl = "/video-player/" + notif.targetId;
            break;
          default:
            break;
        }
        return;
        <MenuItem>
          {`${notif.sender} ${notif.typed}ed your ${(
            <Link to={contentUrl}>notif.target</Link>
          )}`}
        </MenuItem>;
      })}
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to={`/profile/${username}`}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/logout">
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <AppBar position="static" elevation={2} className={classes.container}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography color="inherit" variant="h6" className={classes.title}>
          <Link to="/" style={{ color: "inherit" }}>
            Open Acess
          </Link>
        </Typography>
        {renderMobileMenu}
        {renderMenu}
        {!loggedIn && (
          <Fragment>
            <Button color="primary" component={Link} to="/login">
              Sign in
            </Button>
            <Button color="primary" component={Link} to="/sign-up">
              Register
            </Button>
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton onClick={handleNotifsMenuOpen} color="inherit">
                <Badge
                  badgeContent={notifications.length}
                  classes={{ badge: classes.badge }}
                  max={99}
                >
                  <NotificationsIcon className={classes.icon} />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle className={classes.icon} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon className={classes.icon} />
              </IconButton>
            </div>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
  username: state.user.username,
  notifications: state.user.notifications,
});
export default connect(mapStateToProps)(SiteNav);
