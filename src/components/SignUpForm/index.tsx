import React, { useState } from "react";
import * as ROUTES from "constants/routes";
import { showError } from "utils/errors/error";
import { Container, CssBaseline } from "@material-ui/core";
import Form from "components/Form/Form";
import GreenTextField from "components/GreenTextField";
import SubmitButton from "components/Buttons/SubmitButton";

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
        return firebase
            .user(authUser.user.uid)
            .set({ username, email });
      })
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

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "" || email === "" || username === "";


  return (
    <Container component="main">
      <CssBaseline />
      <Form title={"Załóż konto"} onSubmit={onSubmit}>
        <GreenTextField label={"Nazwa użytkownika"} state={username} setter={setUsername} focused={true}/>
        <GreenTextField label={"Adres e-mail"} state={email} setter={setEmail} />
        <GreenTextField label={"Hasło"} state={passwordOne} setter={setPasswordOne} isPassword={true} />
        <GreenTextField label={"Potwierdź hasło"} state={passwordTwo} setter={setPasswordTwo} isPassword={true} />
        <SubmitButton text={"Załóż konto"} isInvalid={isInvalid} />
      </Form>
    </Container>
  );
};

export default SignUpForm;
