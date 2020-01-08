import React from "react";
import {Box, Typography} from "@material-ui/core";
import "./TabPanel.scss";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FC<ITabPanelProps> = ({children, index, value}) => {
  return (
    <Typography
      className="tab-panel"
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box style={{height: "100%"}} p={3}>{children}</Box>}
    </Typography>
  )
}

export default React.memo(TabPanel)
