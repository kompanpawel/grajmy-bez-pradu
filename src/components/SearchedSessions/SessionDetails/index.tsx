import React, { useCallback } from "react";
import { Button, Drawer } from "@material-ui/core";
import { connect } from "react-redux";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import { withFirebase } from "components/Firebase";
import { compose } from "recompose";
import _ from "lodash";

const mapStateToProps = (state: any) => ({
  open: state.drilldowns.sessionDetailsOpen,
  sessionDetails: state.sessionDetails.data,
  editDetails: state.sessionDetails.editDetails,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleSessionDetailsDrilldown: (toggle: any) => dispatch({ type: TOGGLE_SESSION_DETAILS_DRILLDOWN, toggle }),
});

const SessionDetails: React.FC<any> = ({ firebase, sessionDetails, toggleSessionDetailsDrilldown, editDetails }) => {
  const onJoinSessionClickHandler = useCallback(() => {
    const userID = firebase.auth.currentUser.uid;
    const willingRef = firebase.session(sessionDetails.uuid).child("willing");
    const pushKey = willingRef.push();
    willingRef.once("value", (snapshot: any) => {
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
    });
  }, [firebase, sessionDetails.uuid]);

  const editSessionsSectionRender = () => {
    return <div>{sessionDetails.name}</div>;
  };

  const showSessionSectionRender = () => {
    return (
      <div>
        <div>{sessionDetails.name}</div>
        <Button variant="contained" onClick={onJoinSessionClickHandler}>
          Dołącz do sesji
        </Button>
      </div>
    );
  };
  return <div>{editDetails ? editSessionsSectionRender() : showSessionSectionRender()}</div>;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirebase
)(React.memo(SessionDetails));
