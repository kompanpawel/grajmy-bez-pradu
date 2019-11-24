import React from "react";
import { Drawer } from "@material-ui/core";

const SessionDetails: React.FC<any> = ({state, data}) => {
  return (
    <Drawer variant="persistent" anchor="bottom">
    </Drawer>
  )
};

export default React.memo(SessionDetails);
