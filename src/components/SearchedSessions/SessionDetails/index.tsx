import React, { useCallback, useEffect, useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import { connect } from "react-redux";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import { withFirebase } from "components/Firebase";
import { compose } from "recompose";
import _ from "lodash";
import ViewingDetails from "components/SearchedSessions/ViewingDetails";
import EditableDetails from "components/SearchedSessions/EditableDetails";

const mapStateToProps = (state: any) => ({
  open: state.drilldowns.sessionDetailsOpen,
  sessionDetails: state.sessionDetails.data,
  editDetails: state.drilldowns.editDetails,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleSessionDetailsDrilldown: (toggle: any) => dispatch({ type: TOGGLE_SESSION_DETAILS_DRILLDOWN, toggle }),
});

const SessionDetails: React.FC<any> = ({ firebase, sessionDetails, toggleSessionDetailsDrilldown, editDetails }) => {

  return (
    <div>
      {editDetails ?  <EditableDetails /> : <ViewingDetails />}
    </div>
  )
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirebase
)(React.memo(SessionDetails));
