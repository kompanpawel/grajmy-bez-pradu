import React, { useCallback, useState } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";
import {
  AppBar,
  Button,
  CssBaseline, Divider, Drawer,
  IconButton,
  Link, ListItem, ListItemIcon, ListItemText,
  makeStyles,
  Toolbar,
  Typography, useTheme,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import App from "components/App";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    flexGrow: 1,
  },
  menuButton: {
    margin: theme.spacing(1, 5),
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    color: "green",
    fontSize: "20px",
    fontWeight: 700,
  },
  signInButton: {
    margin: theme.spacing(1, 5),
    backgroundColor: "green",
    color: "white",
    "&:hover": {
      backgroundColor: "lightgreen",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation: React.FC<any> = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {(authUser) => (authUser ? <WrappedNavigationAuth /> : <WrappedNavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth: React.FC<any> = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const clickHandler = useCallback(
    (route: string) => {
      history.push(route);
      setOpen(false)
    },
    [history]
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Ratuj jedzonko
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button key={"main"} onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={"Strona główna"}/>
        </ListItem>
        <ListItem button key={"account"} onClick={() => clickHandler(ROUTES.ACCOUNT)}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={"Konto"}/>
        </ListItem>
        <SignOutButton className={classes.signInButton} />
      </Drawer>
    </div>
  );
};

const NavigationNonAuth: React.FC<any> = ({ history, open, setOpen }) => {
  const classes = useStyles();

  const clickHandler = useCallback(
    (route: string) => {
      history.push(route);
    },
    [history]
  );
  return (
    <div className={classes.container}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link href={ROUTES.MAIN_PAGE} color="inherit" underline="none">
            Ratuj jedzonko
          </Link>
        </Typography>
        <Button onClick={() => clickHandler(ROUTES.SIGN_IN)} className={classes.signInButton}>
          Zaloguj się
        </Button>
      </Toolbar>
    </div>
  );
};

const WrappedNavigationNonAuth = withRouter(NavigationNonAuth);
const WrappedNavigationAuth = withRouter(NavigationAuth);

export default Navigation;
