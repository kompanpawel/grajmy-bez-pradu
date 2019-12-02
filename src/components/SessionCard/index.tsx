import React from "react";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import { TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";

const mapDispatchToProps = (dispatch: any) => ({
  showSessionDetails: (data: any) => dispatch({type: "SHOW_SESSION_DETAILS", data}),
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: any) => dispatch({type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen})
})

const SessionCard: React.FC<any> = ({data, showSessionDetails, toggleSessionDetailsDrilldown}) => {

  const detailsHandler = () => {
    showSessionDetails(data);
    toggleSessionDetailsDrilldown(true);
  }
  const {name, system, date} = data!;
  return (
    <div>
      <div>
        {name}
      </div>
      <div>
        {system}
      </div>
      <div>
        {date}
      </div>
      <SearchIcon onClick={detailsHandler} />
    </div>
  )
};

export default connect(null, mapDispatchToProps)(React.memo(SessionCard));
