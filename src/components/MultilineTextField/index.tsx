import React from "react";
import { TextField } from "@material-ui/core";
import "./MultilineTextField.scss";

interface IMultilineTextFieldProps {
  label: string;
  state: string;
  setter: any;
}

const MultilineTextField: React.FC<IMultilineTextFieldProps> = ({label, state, setter}) => {
  return (
    <TextField
      id="multiline-text-field"
      className="multiline-text-field"
      label={label}
      fullWidth
      multiline
      value={state}
      onChange={(e: any) => setter(e.target.value)}
      margin="normal"
      variant="outlined"
    />
  )
};

export default React.memo(MultilineTextField);