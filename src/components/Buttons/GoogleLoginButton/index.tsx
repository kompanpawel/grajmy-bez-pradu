import React from "react";
import { Button, withStyles } from "@material-ui/core";
import SvgGoogle from "components/inlineIcons/Google";
import "./GoogleLoginButton.scss";

const StyledGoogleButton = withStyles({
  root: {
    margin: "10px 0",
    backgroundColor: "#f4511e",
    color: "white",
    fontWeight: 700,
    maxWidth: 573,
    "&:hover": {
      backgroundColor: "#f4511e",
    },
  },
})(Button)

const GoogleLoginButton: React.FC<any> = ({onClick}) => {
  return (
    <Button className="google-button" variant="contained" type="submit" fullWidth onClick={onClick} startIcon={<SvgGoogle width={30} height={30} />}>
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;