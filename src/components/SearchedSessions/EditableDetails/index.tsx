import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { CircularProgress, Paper, Tab, Tabs } from "@material-ui/core";
import TabPanel from "components/TabPanel";
import EditSessionDetails from "components/EditSessionDetails";
import PlayersSection from "components/PlayersSection";
import EditIcon from "@material-ui/icons/Edit";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";

const mapStateToProps = (state: any) => ({
  sessionDetails: state.sessionDetails.data,
});

const EditableDetails: React.FC<any> = ({ firebase, sessionDetails }) => {
  const [actualTab, setActualTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setActualTab(newTab);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={actualTab}
          centered
          variant="fullWidth"
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<EditIcon />} label="Edytuj dane" />
          <Tab icon={<PeopleIcon />} label="Gracze" />
          <Tab icon={<ChatIcon />} label="Wiadomości" />
        </Tabs>
        <TabPanel value={actualTab} index={0}>
          <EditSessionDetails data={sessionDetails} />
        </TabPanel>
        <TabPanel value={actualTab} index={1}>
          <PlayersSection sessionID={sessionDetails.uuid} />
        </TabPanel>
        <TabPanel value={actualTab} index={2}>
          <div></div>
        </TabPanel>
      </Paper>
    </div>
  );
};

export default compose(connect(mapStateToProps))(React.memo(EditableDetails));
