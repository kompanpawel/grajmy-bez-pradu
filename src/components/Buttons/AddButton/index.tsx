import React from "react";
import { ButtonBase, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import FoodImage from "assets/food.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 300,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      position: "relative",
      height: 100,
      width: "90%",
      [theme.breakpoints.down("xs")]: {},
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15,
        },
        "& $imageMarked": {
          opacity: 0,
        },
        "& $imageTitle": {
          border: "4px solid currentColor",
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
    },
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
    },
    imageTitle: {
      position: "relative",
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
    },
  })
);

interface IAddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<IAddButtonProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonBase focusRipple className={classes.image} focusVisibleClassName={classes.focusVisible} onClick={onClick}>
        <span className={classes.imageSrc} style={{ backgroundImage: `url(${FoodImage})` }} />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
            Dodaj ofertę
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    </div>
  );
};

export default AddButton;
