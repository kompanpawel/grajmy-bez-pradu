import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import { Button } from "@material-ui/core";

enum SIGN_STATUS {
  ACCEPTED = "Zaakceptowano",
  PENDING = "Oczekuje na potwierdzenie",
  SIGNABLE = "Zapisz się na sesje",
}

interface IInfoSessionDetailsProps {
  sessionData: any;
  firebase: any;
  disableTabs: (arg: boolean) => any;
}

const InfoSessionDetails: React.FC<IInfoSessionDetailsProps> = ({ firebase, sessionData, disableTabs }) => {
  const [buttonState, setButtonState] = useState(SIGN_STATUS.SIGNABLE);
  const [hostUsername, setHostUsername] = useState("");

  useEffect(() => {
    firebase
      .session(sessionData.uuid)
      .child("willing")
      .once("value", (snapshot: any) => {
        if (!_.isNil(snapshot.val())) {
          const userID = firebase.auth.currentUser.uid;
          const data = snapshot.val();
          const filteredData = _.filter(data, (item: any) => {
            return item === userID;
          });
          if (filteredData.length !== 0) {
            setButtonState(SIGN_STATUS.PENDING);
            disableTabs(true);
          }
        } else {
          firebase
            .session(sessionData.uuid)
            .child("accepted")
            .once("value", (snapshot: any) => {
              if (!_.isNil(snapshot.val())) {
                const userID = firebase.auth.currentUser.uid;
                const data = snapshot.val();
                const filteredData = _.filter(data, (item: any) => {
                  return item === userID;
                });
                if (filteredData.length !== 0) {
                  setButtonState(SIGN_STATUS.ACCEPTED);
                  disableTabs(false);
                }
              } else {
                setButtonState(SIGN_STATUS.SIGNABLE);
                disableTabs(true);
              }
            });
        }
      });
  }, [buttonState, disableTabs, firebase, sessionData.uuid]);

  const onJoinSessionClickHandler = useCallback(() => {
    const userID = firebase.auth.currentUser.uid;
    const willingRef = firebase.session(sessionData.uuid).child("willing");
    const pushKey = willingRef.push();
    willingRef
      .once("value", (snapshot: any) => {
        if (_.isNil(snapshot.val())) {
          return firebase.session(sessionData.uuid).update({ willing: { [pushKey.key]: userID } });
        }
        const data = snapshot.val();
        const filteredData = _.filter(data, (item: any) => {
          return item === userID;
        });
        if (filteredData.length === 0) {
          willingRef.push(userID);
        }
      })
      .then(() => {
        setButtonState(SIGN_STATUS.PENDING);
        disableTabs(true);
      });
  }, [disableTabs, firebase, sessionData.uuid]);

  const fetchHostName = useCallback(() => {
    firebase
      .user(sessionData.user)
      .child("username")
      .once("value", (snapshot: any) => {
        setHostUsername(snapshot.val());
      });
    return hostUsername;
  }, [firebase, hostUsername, sessionData.user]);

  const buttonText = () => {
    switch (buttonState) {
      case SIGN_STATUS.SIGNABLE:
        return SIGN_STATUS.SIGNABLE;
      case SIGN_STATUS.PENDING:
        return SIGN_STATUS.PENDING;
      case SIGN_STATUS.ACCEPTED:
        return SIGN_STATUS.ACCEPTED;
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={onJoinSessionClickHandler} disabled={buttonState !== SIGN_STATUS.SIGNABLE}>
        {buttonText()}
      </Button>
      {buttonState !== SIGN_STATUS.SIGNABLE && <Button variant="contained">Opuść sesję</Button>}
      <div>
        <div>Sesja gracza: {fetchHostName()}</div>
        Aktualny status
        <div>{sessionData.status}</div>
        Nazwa sesji
        <div>{sessionData.name}</div>
        System
        <div>{sessionData.system}</div>
        Data sesji
        <div>{sessionData.date}</div>
        Maksymalna ilośc graczy
        <div>{sessionData.maxPlayers}</div>
        Dodatkowe info
        <div>{sessionData.info}</div>
      </div>
    </div>
  );
};

export default compose<IInfoSessionDetailsProps, any>(withFirebase)(React.memo(InfoSessionDetails));
