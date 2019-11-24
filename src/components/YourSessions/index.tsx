import React, { useEffect, useState } from "react";
import _ from "lodash";

import { withFirebase } from "components/Firebase";
import { CircularProgress } from "@material-ui/core";
import "./YourSessions.scss";
import SessionCard from "components/SessionCard";

const YourSessions: React.FC<any> = ({ firebase }) => {
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
        {_.map(sessionsList, (session: any) => (
          <WrappedSessionCard data={session} />
        ))}
      </div>
    </>
  );
};

const WrappedSessionCard = withFirebase(SessionCard);

export default React.memo(YourSessions);
