import React, { useState } from "react";
import * as ROUTES from "constants/routes";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Slide,
} from "@material-ui/core";
import GreenTextField from "components/GreenTextField";
import SubmitButton from "components/Buttons/SubmitButton";
import Form from "components/Form/Form";
import { TransitionProps } from "@material-ui/core/transitions";
import { showError } from "utils/errors/error";
import GoogleLoginButton from "components/Buttons/GoogleLoginButton";
import "./SignInForm.scss";
import _ from "lodash";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignInForm: React.FC<any> = ({ firebase, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openError, setOpenError] = useState(false);

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
        setOpenError(true);
      });
    event.preventDefault();
  };

  const googleLogin = () => {
    firebase
      .doSignInWithGoogle()
      .then((authUser: any) => {
        if (_.isNil(firebase.user(authUser.user.uid))) {
          const username = authUser.user.displayName;
          const email = authUser.user.email;
          const number = "";
          const info = "";
          const address = {
            city: "",
            street: "",
            streetNumber: "",
          };
          return firebase.user(authUser.user.uid).set({ username, email, number, info, address });
        }
      })
      .then(() => {
        history.push(ROUTES.MAIN_PAGE);
      })
      .catch((error: any) => {
        setError(error);
        setOpenError(true);
      });
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const isInvalid = password === "" || email === "";
  return (
    <Container component="main">
      <CssBaseline />
      <div className="container">
        <Form title={"Zaloguj się"} onSubmit={onSubmit}>
          <GreenTextField label={"Adres e-mail"} state={email} setter={setEmail} focused={true} />
          <GreenTextField label={"Hasło"} state={password} setter={setPassword} isPassword={true} />
          <SubmitButton text={"Zaloguj się"} isInvalid={isInvalid} />
          <Grid container spacing={2} direction="row">
            <Grid item>
              <Link href={ROUTES.PASSWORD_FORGET} style={{ color: "green" }}>
                Zapomniałeś hasła?
              </Link>
            </Grid>
            <Grid item>
              <Link href={ROUTES.SIGN_UP} style={{ color: "green" }}>
                {"Nie masz konta? Załóż konto!"}
              </Link>
            </Grid>
          </Grid>
        </Form>
        <GoogleLoginButton onClick={googleLogin} />
      </div>
      <Dialog
        open={openError}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleErrorClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Błąd"}</DialogTitle>
        <DialogContent>{error && showError(error)}</DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignInForm;
