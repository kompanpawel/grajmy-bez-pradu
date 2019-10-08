import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { withFirebase } from "components/Firebase";
import SignUpLink from "components/SignUpLink";
import SignInForm from "components/SignInForm";

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <WrappedSignInFrom />
    <SignUpLink />
  </div>
);

const WrappedSignInFrom = compose(
  withRouter,
  withFirebase
)(SignInForm);

export default SignInPage;

export { SignInForm };
