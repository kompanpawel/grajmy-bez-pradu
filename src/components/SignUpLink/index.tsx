import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "constants/routes";

const SignUpLink: React.FC<any> = () => {
  return (
    <p>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUpLink;
