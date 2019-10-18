import React from "react";
import { Button, withStyles } from "@material-ui/core";
import SvgGoogle from "components/inlineIcons/Google";

const StyledGoogleButton = withStyles({
  root: {
    margin: "10px 0",
    backgroundColor: "#f4511e",
    color: "white",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "#f4511e",
    },
  },
})(Button)

const GoogleLoginButton: React.FC<any> = ({onClick}) => {
  return (
    <StyledGoogleButton variant="contained" type="submit" fullWidth onClick={onClick} startIcon={<SvgGoogle width={30} height={30} />}>
      Sign in with Google
    </StyledGoogleButton>
  );
};

export default GoogleLoginButton;