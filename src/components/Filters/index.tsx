import React from "react";
import SystemsDropdown from "components/SystemsDropdown";
import MaxPlayerSlider from "components/MaxPlayersSlider";
import { Button } from "@material-ui/core";

const Filters: React.FC<any> = ({closeDrawer}) => {
  return (
    <div>
      <MaxPlayerSlider />
      <SystemsDropdown />
      <Button variant="contained" onClick={closeDrawer}>
        Potwierdź
      </Button>
    </div>
  );
};

export default React.memo(Filters);
