import React from "react";
import { connect } from "react-redux";
import { EDIT_DETAILS, TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import "./SessionCard.scss";

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
  editDetails: (editDetails: boolean) => dispatch({ type: EDIT_DETAILS, editDetails }),
});

const SessionCard: React.FC<ISessionCardProps> = ({
  data,
  showSessionDetails,
  toggleSessionDetailsDrilldown,
  editDetails,
}) => {
  const detailsHandler = () => {
    showSessionDetails(data);
    toggleSessionDetailsDrilldown(true);
    editDetails(false);
  };

  return (
    <Card className="session-card">
      <CardActionArea onClick={detailsHandler}>
        <CardContent>
          <div className="session-card__title">
            <div className="title-name">{data.name}</div>
            <div className="title-date">{data.date}</div>
            <div className="title-system">System: {data.system}</div>
            <div className="title-maxPlayers">Maks. liczba graczy: {data.maxPlayers}</div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default connect(null, mapDispatchToProps)(React.memo(SessionCard));
