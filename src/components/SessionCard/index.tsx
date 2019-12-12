import React from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { EDIT_DETAILS, TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";

interface ISessionCardProps {
  data: any;
  showSessionDetails: (showSessionDetails: boolean) => any;
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) => any;
  editDetails: (editDetails: boolean) => any;
}

const mapDispatchToProps = (dispatch: any) => ({
  showSessionDetails: (data: any) => dispatch({ type: "SHOW_SESSION_DETAILS", data }),
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: boolean) =>
    dispatch({ type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen }),
  editDetails: (editDetails: boolean) => dispatch({type: EDIT_DETAILS, editDetails})
});

const SessionCard: React.FC<ISessionCardProps> = ({ data, showSessionDetails, toggleSessionDetailsDrilldown, editDetails }) => {
  const { name, system, date } = data!;

  const detailsHandler = () => {
    showSessionDetails(data);
    toggleSessionDetailsDrilldown(true);
    editDetails(false);
  };

  return (
    <div>
      <div>{name}</div>
      <div>{system}</div>
      <div>{date}</div>
      <SearchIcon onClick={detailsHandler} />
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(React.memo(SessionCard));
