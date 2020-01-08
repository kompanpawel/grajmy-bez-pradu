import React from "react";
import { withAuthorization } from "components/Session";
import Calendar from "components/Calendar";

const MainPage: React.FC<any> = () => {
  return (
    <div>
      <div>
        <Calendar />
      </div>
      <div>
        Zapisane sesje
      </div>
    </div>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(MainPage);
