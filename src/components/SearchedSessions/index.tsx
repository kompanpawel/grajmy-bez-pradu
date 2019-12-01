import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CHANGE_SESSION_DATA, FETCH_SESSIONS_DATA } from "store/reducers/data/types";
import SessionCard from "components/SessionCard";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core";

const mapStateToProps = (state: any) => ({
  sessions: state.data.sessions,
  filters: state.filters
});

const mapDispatchToProps = (dispatch: any) => ({
  getSessionsData: (sessions: any) => dispatch({ type: FETCH_SESSIONS_DATA, sessions }),
  changeSessionData: (uid: any, session: any) => dispatch({ type: CHANGE_SESSION_DATA, session, uid }),
});

const SearchedSessions: React.FC<any> = ({ firebase, sessions, filters, getSessionsData, changeSessionData }) => {
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

  const prepareData = () => {
    if(filters.system !== "") {
      return _.filter(sessions, (session: any) => {
        return session.system === filters.system;
      })
    } else {
      return sessions;
    }
  }
  const preparedData = prepareData();
  return (
    <div>
      {loading && (
        <div className="your-sessions__loader">
          <CircularProgress />
        </div>
      )}
      {_.map(preparedData, (sessionData: any) => (
        <SessionCard data={sessionData} />
      ))}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SearchedSessions));
