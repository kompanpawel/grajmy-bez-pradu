import React from "react";
import {Typography} from "@material-ui/core";
import "./Form.scss";

interface IFormProps {
  title: string;
  onSubmit: (event: any) => void;
}

const Form: React.FC<IFormProps> = ({title, onSubmit, children}) => {
  return (
    <div className="form-container">
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <form className="form" noValidate onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  )
}

export default Form;