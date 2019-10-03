import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";

import * as ROUTES from "constants/routes";
import MainPage from "__pages/MainPage";
import SignUpPage from "__pages/SignUp";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.MAIN_PAGE.route} component={MainPage} />
        <Route path={ROUTES.SIGN_UP.route} component={SignUpPage} />
      </div>
    </Router>
  );
};

export default App;
