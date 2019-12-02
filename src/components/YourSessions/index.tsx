import React, { useEffect, useState } from "react";
import _ from "lodash";

import { CircularProgress } from "@material-ui/core";
import "./YourSessions.scss";
import MySessionCard from "components/MySessionCard";

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
        {_.map(sessionsList, (session: any, index: number) => (
          <MySessionCard data={session} key={index} />
        ))}
      </div>
    </>
  );
};


export default React.memo(YourSessions);
