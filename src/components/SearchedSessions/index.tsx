import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FETCH_SESSIONS_DATA } from "store/reducers/data/types";
import SessionCard from "components/SessionCard";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core";
import { getFilteredData } from "store/reducers/data/dataReducer";
import DetailsDrawer from "components/DetailsDrawer";
import "./SearchedSessions.scss";

const mapStateToProps = (state: any) => ({
  sessions: state.data.sessions,
  filters: state.filters,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSessionsData: (sessions: any) => dispatch({ type: FETCH_SESSIONS_DATA, sessions }),
});

const SearchedSessions: React.FC<any> = ({ firebase, sessions, filters, getSessionsData }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (firebase.auth.currentUser) {
      const user = firebase.auth.currentUser.uid;
      setCurrentUser(user);
    }
    firebase.sessions().on("value", (snapshot: any) => {
      const array: any[] = [];
      snapshot.forEach((item: any) => {
        array.push(item.val());
      });
      getSessionsData(array);
      setLoading(false);
    });
  }, [firebase, getSessionsData]);

  const preparedData = currentUser !== "" && getFilteredData(sessions, filters, currentUser);

  return (
    <div className="search-sessions">
      {loading && (
        <div className="search-sessions__loader">
          <CircularProgress />
        </div>
      )}
      {_.map(preparedData, (sessionData: any, index: number) => (
        <SessionCard data={sessionData} key={index} />
      ))}
      <DetailsDrawer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SearchedSessions));
