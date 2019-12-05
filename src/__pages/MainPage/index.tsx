import React from "react";
import { withAuthorization } from "components/Session";

const MainPage: React.FC = () => {
  return (
    <div>
      <div>
        Jakiś kalendarz
      </div>
      <div>
        Co może być na stronie startowej, co jest wazne?
      </div>
    </div>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(MainPage);
