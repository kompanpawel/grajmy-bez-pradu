import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FETCH_SESSIONS_DATA } from "store/reducers/data/types";
import SessionCard from "components/SessionCard";
import _ from "lodash";
import { CircularProgress, Drawer, IconButton } from "@material-ui/core";
import SessionDetails from "components/SearchedSessions/SessionDetails";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { getFilteredData } from "store/reducers/data/dataReducer";

const mapStateToProps = (state: any) => ({
  sessions: state.data.sessions,
  filters: state.filters,
  sessionDetailsOpen: state.drilldowns.sessionDetailsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSessionsData: (sessions: any) => dispatch({ type: FETCH_SESSIONS_DATA, sessions }),
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: any) =>
    dispatch({ type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen }),
});

const SearchedSessions: React.FC<any> = ({
  firebase,
  sessions,
  sessionDetailsOpen,
  filters,
  getSessionsData,
  toggleSessionDetailsDrilldown,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.sessions().on("value", (snapshot: any) => {
      const array: any[] = [];
      snapshot.forEach((item: any) => {
        array.push(item.val());
      });
      getSessionsData(array);
      setLoading(false);
    });
  }, [firebase, getSessionsData]);

  const preparedData = getFilteredData(sessions, filters);
  return (
    <div className="search-sessions">
      {loading && (
        <div className="search-sessions__loader">
          <CircularProgress />
        </div>
      )}
      {_.map(preparedData, (sessionData: any) => (
        <SessionCard data={sessionData} />
      ))}
      <Drawer className="search-sessions__drawer" anchor="right" open={sessionDetailsOpen}>
        <div className="drawer-header">
          <IconButton onClick={() => toggleSessionDetailsDrilldown(false)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <SessionDetails />
      </Drawer>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SearchedSessions));
