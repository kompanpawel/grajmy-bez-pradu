import React from "react";
import PasswordChangeForm from "components/PasswordChangeForm";
import { AuthUserContext, withAuthorization } from "components/Session";

const AccountPage: React.FC<any> = () => {
  return (
    <AuthUserContext.Consumer>
      {(authUser: any) => (
        <>
          <div>
            Nazwa użytkownika (edytuj)
          </div>
          <div>
            Adres email (zmień)
          </div>
          <div>
            Opcjonalne dane (telefon, adres)
          </div>
          <div>
            Informacje o sobie
          </div>
          <div>
            Zmień hasło
          </div>
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(AccountPage);
