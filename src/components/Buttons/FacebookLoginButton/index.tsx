import React, { useCallback } from "react";
import { Button, withStyles } from "@material-ui/core";
import SvgFacebook from "components/inlineIcons/Facebook";

const StyledFacebookButton = withStyles({
  root: {
    margin: "10px 0",
    backgroundColor: "#3C5A99",
    color: "white",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "#3C5A99",
    },
  },
})(Button)

const FacebookLoginButton: React.FC<any> = ({onClick}) => {
  return (
    <StyledFacebookButton variant="contained" type="submit" fullWidth onClick={onClick} startIcon={<SvgFacebook width={30} height={30} />}>
      Login with Facebook
    </StyledFacebookButton>
  );
};

export default FacebookLoginButton;
