import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";
import {AppBar, Button, CssBaseline, Link, makeStyles, Toolbar, Typography, withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
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

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "transparent",
  },
})(AppBar);

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
  const clickHandler = useCallback(
    (route: string) => {
      history.push(route);
    },
    [history]
  );
  return (
    <div className={classes.container}>
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link href={ROUTES.MAIN_PAGE} color="inherit" underline="none">Ratuj jedzonko</Link>
        </Typography>
        <nav>
          <Button onClick={() => clickHandler(ROUTES.ACCOUNT)} className={classes.menuButton}>
            Konto
          </Button>
        </nav>
        <SignOutButton className={classes.signInButton} />
      </Toolbar>
    </div>
  );
};

const NavigationNonAuth: React.FC<any> = ({ history }) => {
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
          <Link href={ROUTES.MAIN_PAGE} color="inherit" underline="none">Ratuj jedzonko</Link>
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
