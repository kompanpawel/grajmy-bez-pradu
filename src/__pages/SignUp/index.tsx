import React from "react";
import { withFirebase } from "components/Firebase";
import SignUpForm from "components/SignUpForm";
import { withRouter } from "react-router";
import { compose } from "recompose";

const SignUpPage: React.FC<any> = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <WrappedSignUpForm />
    </div>
  );
};

const WrappedSignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpForm);

export default SignUpPage;
