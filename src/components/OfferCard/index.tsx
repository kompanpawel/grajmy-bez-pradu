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
import EditIcon from "@material-ui/icons/Edit";
import FoodImage from "assets/food.jpg";
import _ from "lodash";
import { ORDER_STATUS, ORDERS_TABLE } from "__dialogs/NewOfferDialog";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  media: {
    height: 100,
    opacity: 0.4,
  },
  cardActions: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "90% 10%",
  },
  status: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
  title: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  titleName: {
    fontSize: "20px",
    fontWeight: 700,
    alignSelf: "end",
  },
  date: {
    textAlign: "end"
  },
  button: {
    position: "relative",
    top: 10
  }
});

const mockedData = {
  name: "Ziemniaki",
  category: "Warzywa",
  info: "Lorem ipsum ",
  localization: "Gdzieś",
  price: "Za darmo",
  status: "Do wzięcia",
  tags: ["ziemniaki", "warzywa", "oddam"],
  validDate: "bd.",
};

interface IOfferData {
  name?: string;
  localization?: string;
  info?: string;
  category?: string;
  validDate?: string;
  price?: string;
  tags?: string[];
  status?: ORDER_STATUS;
  created?: string;
}

interface IOfferCardProps {
  firebase: any;
  data: IOfferData;
}

const OfferCard: React.FC<IOfferCardProps> = ({ firebase, data }) => {
  const [status, setStatus] = useState(data.status);
  const classes = useStyles();

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={FoodImage} />
        <CardContent>
          <div className={classes.title}>
            <div className={classes.titleName}>{data.name}</div>
            <div className={classes.date}>Stworzono: {data.created}</div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <div className={classes.status}>
          <InputLabel>Status oferty</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            {_.map(ORDERS_TABLE, (status: string) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
        </div>
        <IconButton color="secondary" className={classes.button}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(OfferCard);
