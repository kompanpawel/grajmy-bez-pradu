import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";

import * as ROUTES from "constants/routes";
import MainPage from "__pages/MainPage";
import SignUpPage from "__pages/SignUp";
import SignInPage from "__pages/SignIn";
import withAuthentication from "components/Session/withAuthentication";

const App: React.FC<any> = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.MAIN_PAGE} component={MainPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);
