import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withFirebase } from "components/Firebase";
import _ from "lodash";
import { Button } from "@material-ui/core";

const mapStateToProps = (state: any) => ({
  sessionDetails: state.sessionDetails.data,
});

const EditableDetails: React.FC<any> = ({ firebase, sessionDetails }) => {
  const [willingDisabled, setWillingDisabled] = useState(false);
  const [willingPlayers, setWillingPlayers] = useState([]);

  useEffect(() => {
    firebase
      .session(sessionDetails.uuid)
      .child("willing")
      .once("value", (snapshot: any) => {
        if (_.isNil(snapshot.val())) {
          setWillingDisabled(true);
        } else {
          const array: any = [];
          snapshot.forEach((item: any) => {
            array.push(item.val());
          });
          setWillingPlayers(array);
          setWillingDisabled(false);
        }
      });
  }, [firebase, sessionDetails.uuid]);

  return (
    <div>
      <div>{sessionDetails.name}</div>
      <Button variant="contained" color="primary" disabled={willingDisabled}>
        {willingDisabled ? "Chętnych graczy: 0" : `Chętnych graczy: ${willingPlayers.length}`}
      </Button>
    </div>
  );
};

export default compose(
  connect(mapStateToProps),
  withFirebase
)(React.memo(EditableDetails));
