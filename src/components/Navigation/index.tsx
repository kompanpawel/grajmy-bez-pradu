import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "constants/routes";
import "./Navigation.scss";

import SignOutButton from "components/SignOutButton";
import { AuthUserContext } from "components/Session";

const Navigation: React.FC<any> = () => {
  return (
    <div>
      <AuthUserContext.Consumer>
        {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </div>
  );
};

const NavigationAuth = () => (
  <div className="header__navigation">
    <Link to={ROUTES.MAIN_PAGE} className="header__item">
      Main Page
    </Link>
    <Link to={ROUTES.ACCOUNT} className="header__item">
      Account
    </Link>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div className="header__navigation">
    <Link to={ROUTES.MAIN_PAGE} className="header__item">
      Main Page
    </Link>
    <Link to={ROUTES.SIGN_IN} className="header__item">
      Sign In
    </Link>
  </div>
);

export default Navigation;
