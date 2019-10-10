import React, { useState } from "react";
import * as ROUTES from "constants/routes";
import { showError } from "utils/errors/error";
import {Button, Container, CssBaseline, Grid, Link, makeStyles, TextField, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "green"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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
          <TextField
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
          <TextField
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
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={isInvalid} className={classes.submit}>
            Sign In
          </Button>
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
