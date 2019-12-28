import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { withFirebase } from "components/Firebase";
import { compose } from "recompose";
import UsersTable, { IPlayerTableData, USER_TABLE_TYPE } from "components/UsersTable";
import { CircularProgress } from "@material-ui/core";

interface IPlayersSectionProps {
  firebase: any;
  sessionID: string;
}

const PlayersSection: React.FC<IPlayersSectionProps> = ({ firebase, sessionID }) => {
  const [loading, setLoading] = useState(true);
  const [willingPlayers, setWillingPlayers] = useState([{}]);
  const [acceptedPlayers, setAcceptedPlayers] = useState([{}]);

  useEffect(() => {
    firebase
      .session(sessionID)
      .orderByKey()
      .equalTo("willing")
      .once("value", (willingPlayersDatasnapshot: any) => {
        if (!_.isNil(willingPlayersDatasnapshot.val())) {
          const data = willingPlayersDatasnapshot.val().willing;
          _.forEach(data, (id: any) => {
            firebase.user(id).once("value", (userDataSnapshot: any) => {
              setWillingPlayers((state) => {
                return state.concat({
                  username: userDataSnapshot.val().username,
                  role: "Player",
                  uid: id,
                });
              });
            });
          });
        }
      })
      .then(() => setLoading(false));
  }, [firebase, sessionID]);

  useEffect(() => {
    firebase
      .session(sessionID)
      .orderByKey()
      .equalTo("accepted")
      .once("value", (acceptedPlayersSnapshot: any) => {
        if (!_.isNil(acceptedPlayersSnapshot.val())) {
          const data = acceptedPlayersSnapshot.val().accepted;
          _.forEach(data, (id: any) => {
            firebase.user(id).once("value", (userDataSnapshot: any) => {
              setAcceptedPlayers((state) => {
                return state.concat({
                  username: userDataSnapshot.val().username,
                  role: "Player",
                  uid: id,
                });
              });
            });
          });
        }
      })
      .then(() => setLoading(false));
  }, [firebase, sessionID]);

  const acceptPlayer = (player: IPlayerTableData) => {
    const acceptedRef = firebase.session(sessionID).child("accepted");
    const pushKey = acceptedRef.push();
    acceptedRef.once("value", (snapshot: any) => {
      if (_.isNil(snapshot.val())) {
        setLoading(true);
        return firebase
          .session(sessionID)
          .update({ accepted: { [pushKey.key]: player.uid } })
          .then(() => {
            setAcceptedPlayers((state: any) => {
              return state.concat({
                username: player.username,
                role: "Player",
                uid: player.uid,
              });
            });
          })
          .then(() => {
            firebase
              .session(sessionID)
              .child("willing")
              .once("value", (snapshot: any) => {
                const key = Object.keys(snapshot.val()).find((key) => snapshot.val()[key] === player.uid);
                firebase
                  .session(sessionID)
                  .child("willing")
                  .child(key)
                  .remove();
              })
              .then(() =>
                setWillingPlayers((state: any) => {
                  return state.filter((row: any) => {
                    return row.uid !== player.uid;
                  });
                })
              )
              .then(() => setLoading(false));
          });
      }
      const tempData = snapshot.val();
      const filteredData = _.filter(tempData, (item: any) => {
        return item === player.uid;
      });
      if (filteredData.length === 0) {
        setLoading(true);
        acceptedRef
          .push(player.uid)
          .then(() => {
            setAcceptedPlayers((state: any) => {
              return state.concat({
                username: player.username,
                role: "Player",
                uid: player.uid,
              });
            });
          })
          .then(() => {
            firebase
              .session(sessionID)
              .child("willing")
              .once("value", (snapshot: any) => {
                const key = Object.keys(snapshot.val()).find((key) => snapshot.val()[key] === player.uid);
                firebase
                  .session(sessionID)
                  .child("willing")
                  .child(key)
                  .remove();
              })
              .then(() =>
                setWillingPlayers((state: any) => {
                  return state.filter((row: any) => {
                    return row.uid !== player.uid;
                  });
                })
              )
              .then(() => setLoading(false));
          });
      }
    });
  };

  const removeWillingPlayer = (player: IPlayerTableData) => {
    setLoading(true);
    return firebase
      .session(sessionID)
      .child("willing")
      .once("value", (snapshot: any) => {
        const key = Object.keys(snapshot.val()).find((key) => snapshot.val()[key] === player.uid);
        return firebase
          .session(sessionID)
          .child("willing")
          .child(key)
          .remove();
      })
      .then(() =>
        setWillingPlayers((state: any) => {
          return state.filter((row: any) => {
            return row.uid !== player.uid;
          });
        })
      )
      .then(() => setLoading(false));
  };

  const removeAcceptedPlayer = (player: IPlayerTableData) => {
    setLoading(true);
    return firebase
      .session(sessionID)
      .child("accepted")
      .once("value", (snapshot: any) => {
        const key = Object.keys(snapshot.val()).find((key) => snapshot.val()[key] === player.uid);
        return firebase
          .session(sessionID)
          .child("accepted")
          .child(key)
          .remove();
      })
      .then(() =>
        setAcceptedPlayers((state: any) => {
          return state.filter((row: any) => {
            return row.uid !== player.uid;
          });
        })
      )
      .then(() => setLoading(false));
  };

  const filterData = (data: any) => {
    return _.filter(data, (row: any) => {
      return !_.isEmpty(row);
    });
  };

  const renderWillingTable = () => {
    const data = filterData(willingPlayers);
    if (data.length !== 0) {
      return (
        <UsersTable
          data={data}
          tableType={USER_TABLE_TYPE.WILLING_PLAYERS}
          removePlayer={removeWillingPlayer}
          acceptPlayer={acceptPlayer}
        />
      );
    }
  };

  const renderAcceptedPlayers = () => {
    const data = filterData(acceptedPlayers);
    if (data.length !== 0) {
      return (
        <UsersTable
          data={data}
          tableType={USER_TABLE_TYPE.ACCEPTED_PLAYERS}
          removePlayer={removeAcceptedPlayer}
        />
      );
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div>{renderWillingTable()}</div>
          <div>{renderAcceptedPlayers()}</div>
        </div>
      )}
    </div>
  );
};

export default compose<IPlayersSectionProps, any>(withFirebase)(
  React.memo(PlayersSection)
);
