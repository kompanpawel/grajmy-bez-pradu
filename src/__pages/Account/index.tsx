import React from "react";
import PasswordChangeForm from "components/PasswordChangeForm";
import { AuthUserContext, withAuthorization } from "components/Session";

const AccountPage: React.FC<any> = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser: any) => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(AccountPage);
