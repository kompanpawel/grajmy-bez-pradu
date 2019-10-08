import React, { useState } from "react";
import * as ROUTES from "constants/routes";

const SignInForm: React.FC<any> = ({ firebase, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event: any) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        history.push(ROUTES.MAIN_PAGE);
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };

  const onChange = (setter: any, event: any) => {
    return setter(event.target.value);
  };

  const showError = (error: any) => {
    return error.message;
  };

  const isInvalid = password === "" || email === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => onChange(setEmail, e)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => onChange(setPassword, e)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {error && <p>{showError(error)}</p>}
    </form>
  );
};

export default SignInForm;
