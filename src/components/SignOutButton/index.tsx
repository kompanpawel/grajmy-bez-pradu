import React, { useCallback } from "react";
import { withFirebase } from "components/Firebase";
import { withRouter } from "react-router";
import * as ROUTES from "constants/routes";
import {Button} from "@material-ui/core";

const SignOutButton: React.FC<any> = ({ firebase, history }) => {
  const logoutHandler = useCallback(() => {
    return firebase.doSignOut().then(() => {
      history.push(ROUTES.MAIN_PAGE);
    });
  }, [firebase, history]);
  return (
    <Button onClick={logoutHandler}>
      Logout
    </Button>
  );
};

export default withRouter(withFirebase(SignOutButton));
