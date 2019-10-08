import React, { useEffect, useState } from "react";
import { AuthUserContext } from "components/Session/index";
import {withFirebase} from "components/Firebase";

const withAuthentication = (Component: React.FC) => {
  const WithAuthentication: React.FC<any> = ({ firebase, props }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      firebase.auth.onAuthStateChanged((authUser: any) => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });
    });
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
