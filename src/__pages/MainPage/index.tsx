import React from "react";
import { withAuthorization } from "components/Session";
import Calendar from "components/Calendar";

const MainPage: React.FC = () => {
  return (
    <div>
      <div>
        <Calendar />
      </div>
      <div>
        Co może być na stronie startowej, co jest wazne?
      </div>
    </div>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(MainPage);
