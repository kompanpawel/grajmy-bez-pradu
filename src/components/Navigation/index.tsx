import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";
import { AppBar, Button, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
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
  const clickHandler = (route: string) => {
    history.push(route);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>Main Page</Button>
          <Button onClick={() => clickHandler(ROUTES.ACCOUNT)}>Account</Button>
          <Button onClick={() => clickHandler(ROUTES.ADMIN)}>Admin</Button>
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationNonAuth: React.FC<any> = ({ history }) => {
  const classes = useStyles();

  const clickHandler = (route: string) => {
    history.push(route);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>Main Page</Button>
          <Button onClick={() => clickHandler(ROUTES.SIGN_IN)}>Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const WrappedNavigationNonAuth = withRouter(NavigationNonAuth);
const WrappedNavigationAuth = withRouter(NavigationAuth);

export default Navigation;
