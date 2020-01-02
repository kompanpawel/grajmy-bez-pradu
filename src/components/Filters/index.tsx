import React from "react";
import SystemsDropdown from "components/SystemsDropdown";
import MaxPlayerSlider from "components/MaxPlayersSlider";

const Filters: React.FC<any> = () => {
  return (
    <div>
      <MaxPlayerSlider />
      <SystemsDropdown />
    </div>
  );
};

export default React.memo(Filters);
