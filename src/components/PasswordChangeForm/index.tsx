import React, { useState } from "react";
import { showError } from "utils/errors/error";
import {withFirebase} from "components/Firebase";

const PasswordChangeForm: React.FC<any> = ({ firebase }) => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event: any) => {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && showError(error)}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
