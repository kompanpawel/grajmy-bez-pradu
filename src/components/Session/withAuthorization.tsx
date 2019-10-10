import React, { useEffect } from "react";
import * as ROUTES from "constants/routes";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { withFirebase } from "components/Firebase";
import { AuthUserContext } from "components/Session/index";

const withAuthorization = (condition: any) => (Component: React.FC) => {
  const WithAuthorization: React.FC<any> = ({ firebase, history, props }) => {
    useEffect(() => {
      firebase.auth.onAuthStateChanged((authUser: any) => {
        if (!condition(authUser)) {
          history.push(ROUTES.SIGN_IN);
        }
      });
    });
    return (
      <AuthUserContext.Consumer>
        {(authUser: any) => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
};

export default withAuthorization;
