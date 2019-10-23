import React from "react";
import {TextField, withStyles} from "@material-ui/core";

interface IFormProps {
  label: string;
  state: string;
  setter: any;
  focused?: boolean;
  isPassword?: true;
  required?: false;
}

const StyledGreenTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);


const GreenTextField: React.FC<IFormProps> = ({ label, state, setter, focused = false, isPassword, required = true }) => {
  return (
    <StyledGreenTextField
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
    />
  );
};

export default GreenTextField;
