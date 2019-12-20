import React from "react";
import { Dialog, Button } from "@material-ui/core";

interface IConfirmDialogProps {
  state: any;
  text: string;
  closeHandler: () => void;
  confirmHandler: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({state, text, closeHandler, confirmHandler}) => {

  return (
    <Dialog open={state} keepMounted fullWidth onClose={closeHandler}>
      <div>{text}</div>
      <div>
        <Button type="submit" variant="contained" onClick={confirmHandler}>
          Usuń
        </Button>
        <Button type="submit" variant="contained" onClick={closeHandler}>
          Zamknij
        </Button>
      </div>
    </Dialog>
  );
};

export default React.memo(ConfirmDialog);
