import React, { useEffect, useState } from "react";
import _ from "lodash";

import { CircularProgress, Drawer, IconButton } from "@material-ui/core";
import "./YourSessions.scss";
import MySessionCard from "components/MySessionCard";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SessionDetails from "components/SearchedSessions/SessionDetails";
import { connect } from "react-redux";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import DetailsDrawer from "components/DetailsDrawer";

interface IYourSessionsProps {
  firebase: any;
  sessionDetailsOpen: boolean;
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) => any;
}

const mapStateToProps = (state: any) => ({
  sessionDetailsOpen: state.drilldowns.sessionDetailsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) => dispatch({type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen}),
});

const YourSessions: React.FC<IYourSessionsProps> = ({ firebase, sessionDetailsOpen, toggleSessionDetailsDrilldown }) => {
  const [userID, setUserID] = useState("");
  const [sessionsList, setSessionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUserID(user.uid.toString());
        firebase
          .sessions()
          .orderByChild("user")
          .equalTo(userID)
          .on("value", (snapshot: any) => {
            const array: any = [];
            snapshot.forEach((item: any) => {
              array.push(item.val());
            });
            setSessionsList(array);
            setLoading(false);
          });
      } else {
        console.log("No user is signed in");
      }
    });
  }, [firebase, userID]);

  return (
    <>
      <div className="your-sessions__title">Twoje sesje</div>
      {loading && (
        <div className="your-sessions__loader">
          <CircularProgress />
        </div>
      )}
      <div>
        {_.map(sessionsList, (session: any, index: number) => (
          <MySessionCard data={session} key={index} />
        ))}
      </div>
      <DetailsDrawer />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(YourSessions));
