import React from "react";
import { withFirebase } from "components/Firebase";

const SignOutButton: React.FC<any> = ({ firebase }) => {
  return (
    <button type="button" onClick={firebase.doSignOut}>
      Logout
    </button>
  );
};

export default withFirebase(SignOutButton);
