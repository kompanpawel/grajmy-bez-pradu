import React, { useState } from "react";
import { showError } from "utils/errors/error";
import { withFirebase } from "components/Firebase";

const PasswordForgetForm: React.FC<any> = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event: any) => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };
  const isInvalid = email === "";
  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {error && <p>{showError(error)}</p>}
    </form>
  );
};

const WrappedPasswordForgetForm = withFirebase(PasswordForgetForm);

export default WrappedPasswordForgetForm;
