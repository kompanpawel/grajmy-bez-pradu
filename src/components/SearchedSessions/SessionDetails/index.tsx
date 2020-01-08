import React from "react";
import { connect } from "react-redux";
import { withFirebase } from "components/Firebase";
import { compose } from "recompose";
import ViewingDetails from "components/SearchedSessions/ViewingDetails";
import EditableDetails from "components/SearchedSessions/EditableDetails";

const mapStateToProps = (state: any) => ({
  editDetails: state.drilldowns.editDetails,
});

const SessionDetails: React.FC<any> = ({ editDetails }) => {
  return <>{editDetails ? <WrappedEditableDetails /> : <ViewingDetails />}</>;
};

const WrappedEditableDetails = withFirebase(EditableDetails);

export default compose(
  connect(mapStateToProps),
  withFirebase
)(React.memo(SessionDetails));
