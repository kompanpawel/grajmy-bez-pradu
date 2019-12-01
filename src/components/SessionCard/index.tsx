import React from "react";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) => ({
  showSessionDetails: (data: any) => dispatch({type: "SHOW_SESSION_DETAILS", data})
})

const SessionCard: React.FC<any> = ({data, showSessionDetails}) => {
  const {name, system, date} = data!;
  return (
    <div onClick={() => showSessionDetails(data)}>
      <div>
        {name}
      </div>
      <div>
        {system}
      </div>
      <div>
        {date}
      </div>
    </div>
  )
};

export default connect(null, mapDispatchToProps)(React.memo(SessionCard));
