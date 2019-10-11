import React, { useState } from "react";
import { showError } from "utils/errors/error";
import { withFirebase } from "components/Firebase";
import GreenTextField from "components/GreenTextField";
import SubmitButton from "components/Buttons/SubmitButton";
import Form from "components/Form/Form";

const PasswordForgetForm: React.FC<any> = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event: any) => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };
  const isInvalid = email === "";
  return (
    <Form title={"Password Reset"} onSubmit={onSubmit}>
      <GreenTextField label={"E-mail"} state={email} setter={setEmail} focused={true} />
      <SubmitButton text={"Reset my password"} isInvalid={isInvalid} />
      {error && <p>{showError(error)}</p>}
    </Form>
  );
};

const WrappedPasswordForgetForm = withFirebase(PasswordForgetForm);

export default WrappedPasswordForgetForm;
