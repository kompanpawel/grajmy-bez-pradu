import React from "react";
import { TextField } from "@material-ui/core";
import "./GreenTextField.scss";

interface IFormProps {
  label: string;
  state: string;
  setter: any;
  focused?: boolean;
  isPassword?: true;
  required?: false;
}

const GreenTextField: React.FC<IFormProps> = ({
  label,
  state,
  setter,
  focused = false,
  isPassword,
  required = true,
}) => {
  const isInputEmpty = state === "";
  const errorHandling = isInputEmpty && required;
  return (
    <TextField
      className="text-field"
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      label={label}
      value={state}
      autoComplete={isPassword ? "current-password" : ""}
      autoFocus={focused}
      type={isPassword ? "password" : "text"}
      onChange={(e) => setter(e.target.value)}
      error={errorHandling}
      helperText={errorHandling && "To pole należy wypełnić"}
    />
  );
};

export default GreenTextField;
