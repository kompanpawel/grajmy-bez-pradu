import React from "react";
import { Drawer } from "@material-ui/core";
import { connect } from "react-redux";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";

const mapStateToProps = (state: any) => ({
  open: state.drilldowns.sessionDetailsOpen,
  sessionDetails: state.sessionDetails.data,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleSessionDetailsDrilldown: (toggle: any) => dispatch({type: TOGGLE_SESSION_DETAILS_DRILLDOWN, toggle})
})

const SessionDetails: React.FC<any> = ({ sessionDetails, toggleSessionDetailsDrilldown}) => {
  return (
    <div>
      {sessionDetails.name}
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SessionDetails));
