import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import { Button, Paper, Tab, Tabs } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import TabPanel from "components/TabPanel";
import InfoSessionDetails from "components/InfoSessionDetails";
import ViewPlayersSection from "components/ViewPlayersSection";
import Messages from "components/Messages";

const mapStateToProps = (state: any) => ({
  sessionDetails: state.sessionDetails.data,
});

const ViewingDetails: React.FC<any> = ({ firebase, sessionDetails }) => {
  const [disableTabs, setDisableTabs] = useState(true);
  const [actualTab, setActualTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setActualTab(newTab);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={actualTab}
          onChange={handleTabChange}
          centered
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<InfoIcon />} label="Informacje o sesji" />
          <Tab
            icon={disableTabs ? <PeopleIcon color="disabled" /> : <PeopleIcon />}
            label="Gracze"
            disabled={disableTabs}
          />
          <Tab
            icon={disableTabs ? <ChatIcon color="disabled" /> : <ChatIcon />}
            label="Wiadomości"
            disabled={disableTabs}
          />
        </Tabs>
        <TabPanel value={actualTab} index={0}>
          <InfoSessionDetails sessionData={sessionDetails} disableTabs={setDisableTabs} />
        </TabPanel>
        <TabPanel value={actualTab} index={1}>
          <ViewPlayersSection sessionID={sessionDetails.uuid} />
        </TabPanel>
        <TabPanel value={actualTab} index={2}>
          <Messages sessionID={sessionDetails.uuid} />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default compose(
  connect(mapStateToProps),
  withFirebase
)(React.memo(ViewingDetails));
