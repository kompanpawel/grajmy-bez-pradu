import React, {useCallback} from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";
import {AppBar, Button, CssBaseline, makeStyles, Toolbar, withStyles} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  container: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledAppBar = withStyles({
  root: {
    backgroundColor: "green",
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
  const clickHandler = useCallback((route: string) => {
    history.push(route);
  }, [history]);
  return (
    <div className={classes.container}>
      <CssBaseline />
      <StyledAppBar position="static">
        <Toolbar>
          <Button onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>Main Page</Button>
          <Button onClick={() => clickHandler(ROUTES.ACCOUNT)}>Account</Button>
          <Button onClick={() => clickHandler(ROUTES.ADMIN)}>Admin</Button>
          <SignOutButton />
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

const NavigationNonAuth: React.FC<any> = ({ history }) => {
  const classes = useStyles();

  const clickHandler = useCallback((route: string) => {
      history.push(route);
  }, [history]);
  return (
    <div className={classes.container}>
      <StyledAppBar position="static">
        <Toolbar>
          <Button onClick={() => clickHandler(ROUTES.MAIN_PAGE)}>Main Page</Button>
          <Button onClick={() => clickHandler(ROUTES.SIGN_IN)}>Sign In</Button>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

const WrappedNavigationNonAuth = withRouter(NavigationNonAuth);
const WrappedNavigationAuth = withRouter(NavigationAuth);

export default Navigation;
