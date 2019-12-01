import React from "react";
import SystemsDropdown from "components/SystemsDropdown";
import { withFirebase } from "components/Firebase";
import MaxPlayerSlider from "components/MaxPlayersSlider";
import { Button } from "@material-ui/core";

const Filters: React.FC<any> = () => {
  return (
    <div>
      <MaxPlayerSlider />
      <WrappedSystemsDropdown />
    </div>
  );
};

const WrappedSystemsDropdown = withFirebase(SystemsDropdown);

export default React.memo(Filters);
