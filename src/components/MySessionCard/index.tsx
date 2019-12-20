import React, { ReactNode, useCallback, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SessionImage from "assets/sesja.png";
import _ from "lodash";
import { ORDERS_TABLE } from "components/__dialogs/NewSessionDialog";
import "components/MySessionCard/MySessionCard.scss";
import { connect } from "react-redux";
import { EDIT_DETAILS, TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import ConfirmDialog from "components/__dialogs/ConfirmDialog";

interface IMySessionCardProps {
  data: any;
  firebase: any;
  showSessionDetails: (data: any) => any;
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: any) => any;
  editDetails: (editDetails: boolean) => any;
}

const mapDispatchToProps = (dispatch: any) => ({
  showSessionDetails: (data: any) => dispatch({ type: "SHOW_SESSION_DETAILS", data }),
  toggleSessionDetailsDrilldown: (sessionDetailsOpen: any) =>
    dispatch({ type: TOGGLE_SESSION_DETAILS_DRILLDOWN, sessionDetailsOpen }),
  editDetails: (editDetails: boolean) => dispatch({ type: EDIT_DETAILS, editDetails }),
});

const dialogText = "Czy na pewno chcesz usunąć sesję?";

const MySessionCard: React.FC<IMySessionCardProps> = ({
  data,
  firebase,
  showSessionDetails,
  toggleSessionDetailsDrilldown,
  editDetails,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSessionDelete = useCallback(() => {
    return firebase.session(data.uuid).remove();
  }, [data.uuid, firebase]);

  const handleCardClick = () => {
    showSessionDetails(data);
    toggleSessionDetailsDrilldown(true);
    editDetails(true);
  };

  return (
    <Card className="session-card">
      <CardActionArea onClick={handleCardClick}>
        <CardMedia className="session-card__image" image={SessionImage} />
        <CardContent>
          <div className="session-card__title">
            <div className="title-name">{data.name}</div>
            <div className="title-date">Stworzono: {data.created}</div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className="session-card__card-actions">
        <IconButton color="secondary" className="delete-button" onClick={handleDialogOpen}>
          <DeleteIcon />
          Usuń
        </IconButton>
      </CardActions>
      {dialogOpen && (
        <ConfirmDialog
          text={dialogText}
          state={dialogOpen}
          closeHandler={handleDialogClose}
          confirmHandler={handleSessionDelete}
        />
      )}
    </Card>
  );
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withFirebase
  // @ts-ignore
)(React.memo(MySessionCard));
