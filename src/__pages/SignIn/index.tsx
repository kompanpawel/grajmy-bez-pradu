import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { withFirebase } from "components/Firebase";
import SignInForm from "components/SignInForm";

const SignInPage = () => (
  <div>
    <WrappedSignInFrom />
  </div>
);

const WrappedSignInFrom = compose(
  withRouter,
  withFirebase
)(SignInForm);

export default SignInPage;
