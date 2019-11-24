import React from "react";
import { ButtonBase, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import SessionImage from "assets/sesja.png";
import "./AddButton.scss";
import { IAddButtonProps } from "components/Buttons/AddButton/index.types";

const AddButton: React.FC<IAddButtonProps> = ({ onClick }) => {

  return (
    <div className="add-button">
      <ButtonBase focusRipple className="image" onClick={onClick}>
        <span className="image__src" style={{ backgroundImage: `url(${SessionImage})` }} />
        <span className="image__backdrop" />
        <span className="image__button">
          <Typography component="span" variant="subtitle1" color="inherit" className="image__title">
            Dodaj sesję
            <span className="image__marked" />
          </Typography>
        </span>
      </ButtonBase>
    </div>
  );
};

export default React.memo(AddButton);
