import React from "react";
import { Button } from "@material-ui/core";
import "./SubmitButton.scss";

interface ISubmitButtonProps {
  text: string;
  isInvalid?: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({ text, isInvalid }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={isInvalid}
      className="submit-button"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
