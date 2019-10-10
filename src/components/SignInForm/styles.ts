import {Button, makeStyles, TextField, Theme, withStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "green",
  },
  form: {
    marginTop: theme.spacing(1),
    focused: "green",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

export const StyledButton = withStyles({
  root: {
    backgroundColor: "green",
      "&:hover": {
        backgroundColor: "green"
      }
  }
})(Button);
