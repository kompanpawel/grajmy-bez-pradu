import React, { useState } from "react";
import * as ROUTES from "constants/routes";
import { Button, Container, CssBaseline, Grid, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import {StyledButton, StyledTextField, useStyles} from "components/SignInForm/styles";



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
  const classes = useStyles();
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isInvalid}
            className={classes.submit}
          >
            Sign In
          </StyledButton>
          <Grid container>
            <Grid item xs>
              <Link href={ROUTES.PASSWORD_FORGET}>Forget password?</Link>
            </Grid>
            <Grid item>
              <Link href={ROUTES.SIGN_UP}>{"Don't have an account? Sign up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInForm;
