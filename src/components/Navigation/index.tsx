import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";
import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";

const Navigation: React.FC<any> = ({ open, setOpen }) => {
  return (
    <div className="navigation__wrapper">
      <AuthUserContext.Consumer>
        {(authUser) => (
          <WrappedNavigationMenu
            isAuth={authUser}
            state={open}
            setter={setOpen}
          />
        )}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationMenu: React.FC<any> = ({ history, isAuth, state, setter, titleState }) => {
  const theme = useTheme();

  const handleDrawerOpen = useCallback(() => {
    setter(true);
  }, [setter]);

  const handleDrawerClose = useCallback(() => {
    setter(false);
  }, [setter]);

  const clickHandler = useCallback(
    (route: string) => {
      history.push(route);
      setter(false);
    },
    [history, setter]
  );

  const renderAuth = () => (
    <div className="navigation">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx("navigation__app-bar", {
          ["navigation__app-bar--shift"]: state,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className="navigation__menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {titleState}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="navigation-drawer" variant="persistent" anchor="left" open={state}>
        <div className="navigation-drawer__header">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button key={"main"} onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Strona główna"} />
        </ListItem>
        <ListItem button key={"account"} onClick={() => clickHandler(ROUTES.ACCOUNT)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Konto"} />
        </ListItem>
        <ListItem button key={"make-session"} onClick={() => clickHandler(ROUTES.MAKE_SESSION)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Twoje sesje"} />
        </ListItem>
        <ListItem button key={"search"} onClick={() => clickHandler(ROUTES.SEARCH_SESSION)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Znajdź sesję"} />
        </ListItem>
        <SignOutButton className="navigation__sign-in-button" />
      </Drawer>
    </div>
  );

  const renderNonAuth = () => (
    <div className="navigation">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx("navigation-app-bar", {
          ["navigation__app-bar--shift"]: state,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className="navigation__menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Grajmy bez prądu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="navigation-drawer" variant="persistent" anchor="left" open={state}>
        <div className="navigation-drawer__header">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button key={"main"} onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Strona główna"} />
        </ListItem>
        <Button onClick={() => clickHandler(ROUTES.SIGN_IN)} className="navigation__sign-in-button">
          Zaloguj się
        </Button>
      </Drawer>
    </div>
  );

  return isAuth ? renderAuth() : renderNonAuth();
};

const WrappedNavigationMenu = withRouter(NavigationMenu);

export default Navigation;
