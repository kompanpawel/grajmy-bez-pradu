import React, {useEffect, useState} from "react";
import {compose} from "recompose";
import {withFirebase} from "components/Firebase";
import _ from "lodash";
import UsersTable, {USER_TABLE_TYPE} from "components/UsersTable";

interface IViewPlayersSection {
  sessionID: string;
  firebase: any;
}

const ViewPlayersSection: React.FC<IViewPlayersSection> = ({firebase, sessionID}) => {
  const [acceptedPlayers, setAcceptedPlayers] = useState([{}])

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
  }, [firebase, sessionID]);

  const filteredData = () => {
    return _.filter(acceptedPlayers, (row: any) => {
      return !_.isEmpty(row);
    });
  }

  return (
    <div>
      <UsersTable data={filteredData()} tableType={USER_TABLE_TYPE.VIEWING_PLAYERS}/>
    </div>
  )
}

export default compose<IViewPlayersSection, any>(withFirebase)(React.memo(ViewPlayersSection));
