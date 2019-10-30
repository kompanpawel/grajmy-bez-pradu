import React from "react";
import { Button, makeStyles, Theme, withStyles } from "@material-ui/core";

const greenButtonStyle = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const StyledGreenButton = withStyles({
  root: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "lightgreen",
    },
  },
})(Button);

interface ISubmitButtonProps {
  text: string;
  isInvalid?: boolean;
}

const SubmitButton: React.FC<ISubmitButtonProps> = ({ text, isInvalid }) => {
  const classes = greenButtonStyle();
  return (
    <StyledGreenButton
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={isInvalid}
      className={classes.submit}
    >
      {text}
    </StyledGreenButton>
  );
};

export default SubmitButton;
