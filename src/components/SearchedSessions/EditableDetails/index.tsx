import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import _ from "lodash";
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import UsersTable from "components/UsersTable";

const mapStateToProps = (state: any) => ({
  sessionDetails: state.sessionDetails.data,
});

const columns = [{ title: "Nazwa użytkownika", field: "username" }, { title: "Rola", field: "role" }];

const EditableDetails: React.FC<any> = ({ firebase, sessionDetails }) => {
  const [loading, setLoading] = useState(true);
  const [playersID, setPlayersID] = useState([]);
  const [willingPlayers, setWillingPlayers] = useState([{}]);

  useEffect(() => {
    firebase
      .session(sessionDetails.uuid)
      .orderByKey()
      .equalTo("willing")
      .on("value", (willingPlayersDatasnapshot: any) => {
        const data = willingPlayersDatasnapshot.val().willing;
        _.forEach(data, (id: any) => {
          firebase.user(id).on("value", (userDataSnapshot: any) => {
            setWillingPlayers((state) => {
              return state.concat({
                username: userDataSnapshot.val().username,
                role: "Player",
                uid: id,
              });
            });
          });
        });
      });
  }, [firebase, sessionDetails.uuid]);

  const createUsersTable = () => {
    const filteredData = _.filter(willingPlayers, (row: any) => {
      return !_.isEmpty(row);
    });
    console.log(filteredData);
    return <UsersTable data={filteredData} />;
  };

  return (
    <div>
      <div>{sessionDetails.name}</div>
      {createUsersTable()}
    </div>
  );
};

export default compose(connect(mapStateToProps))(React.memo(EditableDetails));
