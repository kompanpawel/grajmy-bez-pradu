import React from "react";
import { withFirebase } from "components/Firebase";
import SignUpForm from "components/SignUpForm";
import { withRouter } from "react-router";
import { compose } from "recompose";

const SignUpPage: React.FC<any> = () => {
  return (
    <WrappedSignUpForm />
  );
};

const WrappedSignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpForm);

export default SignUpPage;
