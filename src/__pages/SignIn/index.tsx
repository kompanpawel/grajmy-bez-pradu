import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { withFirebase } from "components/Firebase";
import SignUpLink from "components/SignUpLink";
import SignInForm from "components/SignInForm";
import PasswordForgetLink from "components/PasswordForgetLink";

const SignInPage = () => (
  <div>
    <WrappedSignInFrom />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const WrappedSignInFrom = compose(
  withRouter,
  withFirebase
)(SignInForm);

export default SignInPage;
