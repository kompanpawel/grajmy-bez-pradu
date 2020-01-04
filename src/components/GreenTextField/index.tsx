import React from "react";
import { TextField } from "@material-ui/core";
import "./GreenTextField.scss";
import _ from "lodash";

export enum FORM_TYPES {
  NUMERIC = "NUMERIC",
  MULTILINE = "MULTILINE",
}

interface IFormProps {
  label: string;
  state: string | number;
  setter: any;
  focused?: boolean;
  isPassword?: true;
  type?: FORM_TYPES;
  required?: false;
}

const GreenTextField: React.FC<IFormProps> = ({
  label,
  state,
  setter,
  focused = false,
  isPassword,
  required = true,
  type
}) => {
  const isInputEmpty = state === "";
  const errorHandling = isInputEmpty && required;
  const numberState = Number(state)
  const numericError = type === FORM_TYPES.NUMERIC && !_.isFinite(numberState);
  const errorText = errorHandling ? "To pole należy wypełnić" : numericError ? "Pole musi zawierać cyfrę" : "";

  return (
    <TextField
      className="text-field"
      variant="outlined"
      margin="normal"
      required={required}
      multiline={type === FORM_TYPES.MULTILINE}
      fullWidth
      label={label}
      value={state}
      autoComplete={isPassword ? "current-password" : ""}
      autoFocus={focused}
      type={isPassword ? "password" : "text"}
      onChange={(e) => setter(e.target.value)}
      error={errorHandling || numericError}
      helperText={errorText}
    />
  );
};

export default GreenTextField;
