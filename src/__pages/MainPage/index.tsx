import React from "react";
import { withAuthorization } from "components/Session";

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <p>The main page is accessible by every signed in user</p>
    </div>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(MainPage);
