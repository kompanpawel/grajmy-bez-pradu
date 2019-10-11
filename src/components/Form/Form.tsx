import React from "react";
import {makeStyles, Theme, Typography} from "@material-ui/core";

interface IFormProps {
  title: string;
  onSubmit: (event: any) => void;
}

export const greenFormsStyles = makeStyles((theme: Theme) => ({
  container: {
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
}));

const Form: React.FC<IFormProps> = ({title, onSubmit, children}) => {
  const classes = greenFormsStyles();
  return (
    <div className={classes.container}>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}

export default Form;