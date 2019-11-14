import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";

import * as ROUTES from "constants/routes";
import MainPage from "__pages/MainPage";
import SignUpPage from "__pages/SignUp";
import SignInPage from "__pages/SignIn";
import withAuthentication from "components/Session/withAuthentication";
import PasswordForgetPage from "__pages/PasswordForget";
import AccountPage from "__pages/Account";
import MakeSessionPage from "__pages/GiveFood";

const App: React.FC<any> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <Navigation open={open} setOpen={setOpen} />
      <div onClick={() => setOpen(false)}>
        <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.MAKE_SESSION} component={MakeSessionPage} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);
