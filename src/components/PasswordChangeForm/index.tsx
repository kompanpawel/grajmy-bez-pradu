import React, { useState } from "react";
import { withFirebase } from "components/Firebase";
import Form from "components/Form/Form";
import GreenTextField from "components/GreenTextField";
import SubmitButton from "components/Buttons/SubmitButton";
import SuccessDialog from "components/__dialogs/SuccessDialog/SuccessDialog";
import { showError } from "utils/errors/error";

const PasswordChangeForm: React.FC<any> = ({ firebase }) => {
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  }

  const onSubmit = (event: any) => {
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
        setDialogOpen(true);
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
  return (
    <Form title={"Zmień hasło"} onSubmit={onSubmit}>
      {error && showError(error)}
      <GreenTextField
        label={"Nowe hasło"}
        state={passwordOne}
        setter={setPasswordOne}
        isPassword={true}
        required={false}
      />
      <GreenTextField label={"Powtórz hasło"} state={passwordTwo} setter={setPasswordTwo} isPassword={true} required={false} />
      <SubmitButton text={"Potwierdź zmianę hasła"} isInvalid={isInvalid} />
      {dialogOpen && <SuccessDialog state={dialogOpen} closeHandler={handleDialogClose}/>}
    </Form>
  );
};

export default withFirebase(PasswordChangeForm);
