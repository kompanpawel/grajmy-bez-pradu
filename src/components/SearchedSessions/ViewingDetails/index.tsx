import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import { Button } from "@material-ui/core";

const mapStateToProps = (state: any) => ({
  sessionDetails: state.sessionDetails.data,
});

const ViewingDetails: React.FC<any> = ({ firebase, sessionDetails }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    firebase
      .session(sessionDetails.uuid)
      .child("willing")
      .once("value", (snapshot: any) => {
        if (!_.isNil(snapshot.val())) {
          const userID = firebase.auth.currentUser.uid;
          const data = snapshot.val();
          const filteredData = _.filter(data, (item: any) => {
            return item === userID;
          });
          if (filteredData.length !== 0) {
            setDisabled(true);
          }
        } else {
          setDisabled(false);
        }
      });
  }, [disabled, sessionDetails.uuid]);

  const onJoinSessionClickHandler = useCallback(() => {
    const userID = firebase.auth.currentUser.uid;
    const willingRef = firebase.session(sessionDetails.uuid).child("willing");
    const pushKey = willingRef.push();
    willingRef
      .once("value", (snapshot: any) => {
        if (_.isNil(snapshot.val())) {
          return firebase.session(sessionDetails.uuid).update({ willing: { [pushKey.key]: userID } });
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
        setDisabled(true);
      });
  }, [firebase, sessionDetails.uuid]);

  return (
    <div>
      <div>{sessionDetails.name}</div>
      <Button variant="contained" onClick={onJoinSessionClickHandler} disabled={disabled}>
        {disabled ? "Zapisałeś się" : "Dołącz do sesji"}
      </Button>
    </div>
  );
};

export default compose(
  connect(mapStateToProps),
  withFirebase
)(React.memo(ViewingDetails));
