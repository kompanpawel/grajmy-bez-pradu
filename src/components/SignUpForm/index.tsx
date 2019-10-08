import React, { useState } from "react";
import * as ROUTES from "constants/routes";

const SignUpForm: React.FC<any> = ({ firebase, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: any) => {
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        setUsername("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");
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

  const isInvalid = () => {
    return passwordOne !== passwordTwo || passwordOne === "" || email === "" || username === "";
  };

  const showError = (error: any) => {
    return error.message;
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={(e) => onChange(setUsername, e)}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={(e) => onChange(setEmail, e)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => onChange(setPasswordOne, e)}
        type="text"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => onChange(setPasswordTwo, e)}
        type="text"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid()} type="submit">
        Sign Up
      </button>
      {error && <p>{showError(error)}</p>}
    </form>
  );
};

export default SignUpForm;
