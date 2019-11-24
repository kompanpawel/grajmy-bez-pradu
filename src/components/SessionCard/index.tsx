import React, { useState } from "react";
import {
  Card,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SessionImage from "assets/sesja.png";
import _ from "lodash";
import { SESSION_STATUS, ORDERS_TABLE } from "__dialogs/NewSessionDialog";
import "./SessionCard.scss";

interface IOfferData {
  created?: string;
  date?: string;
  info?: string;
  localization: string;
  maxPlayers: string;
  name?: string;
  players?: string;
  status?: SESSION_STATUS;
  system?: string;
  tags: string[];
}

interface IOfferCardProps {
  firebase: any;
  data: IOfferData;
}

const SessionCard: React.FC<IOfferCardProps> = ({ firebase, data }) => {
  const [status, setStatus] = useState(data.status);

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <Card className="session-card">
      <CardActionArea >
        <CardMedia className="session-card__image" image={SessionImage} />
        <CardContent>
          <div className="session-card__title">
            <div className="title-name">{data.name}</div>
            <div className="title-date">Stworzono: {data.created}</div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className="session-card__card-actions">
        <div className="status">
          <InputLabel>Status sesji</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            {_.map(ORDERS_TABLE, (status: string) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
        </div>
        <IconButton color="secondary" className="delete-button">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(SessionCard);
