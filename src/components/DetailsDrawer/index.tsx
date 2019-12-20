import React from "react";
import { Drawer, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SessionDetails from "components/SearchedSessions/SessionDetails";
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import { connect } from "react-redux";
import "./DetailsDrawer.scss";

interface IDetailsDrawerProps {
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) => any;
  sessionDetailsOpen: boolean
}

const mapStateToProps = (state: any) => ({
  sessionDetailsOpen: state.drilldowns.sessionDetailsOpen,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) => dispatch({type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen}),
});

const DetailsDrawer: React.FC<IDetailsDrawerProps> = ({ toggleSessionDetailsDrilldown, sessionDetailsOpen}) => {
  return (
    <Drawer className="drawer-details" anchor="right" open={sessionDetailsOpen}>
      <div className="drawer-details__header">
        <IconButton onClick={() => toggleSessionDetailsDrilldown(false)}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <SessionDetails />
    </Drawer>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DetailsDrawer));