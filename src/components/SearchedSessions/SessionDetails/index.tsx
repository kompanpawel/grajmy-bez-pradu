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
  editDetails: state.drilldowns.editDetails,
});

const SessionDetails: React.FC<any> = ({ editDetails }) => {
  return <div>{editDetails ? <EditableDetails /> : <ViewingDetails />}</div>;
};

export default compose(
  connect(mapStateToProps),
  withFirebase
)(React.memo(SessionDetails));
