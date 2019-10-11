import React, { useState } from "react";
import * as ROUTES from "constants/routes";
import { Container, CssBaseline, Grid, Link } from "@material-ui/core";
import GreenTextField from "components/GreenTextField";
import SubmitButton from "components/Buttons/SubmitButton";
import Form  from "components/Form/Form";

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

  const isInvalid = password === "" || email === "";
  return (
    <Container component="main">
      <CssBaseline />
      <Form title={"Sign in"} onSubmit={onSubmit}>
        <GreenTextField label={"E-mail Address"} state={email} setter={setEmail} focused={true} />
        <GreenTextField label={"Password"} state={password} setter={setPassword} isPassword={true} />
        <SubmitButton text={"Sign in"} isInvalid={isInvalid} />
        <Grid container>
          <Grid item xs>
            <Link href={ROUTES.PASSWORD_FORGET}>Forget password?</Link>
          </Grid>
          <Grid item>
            <Link href={ROUTES.SIGN_UP}>{"Don't have an account? Sign up"}</Link>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export default SignInForm;
