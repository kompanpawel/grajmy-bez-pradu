import React  from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";

import * as ROUTES from "constants/routes";
import MainPage from "__pages/MainPage";
import SignUpPage from "__pages/SignUp";
import SignInPage from "__pages/SignIn";
import withAuthentication from "components/Session/withAuthentication";
import PasswordForgetPage from "__pages/PasswordForget";
import AccountPage from "__pages/Account";
import AdminPage from "__pages/Admin";

const App: React.FC<any> = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);
