import React from "react";
import { Button, Dialog } from "@material-ui/core";

interface ISuccessDialogProps {
  state: boolean;
  closeHandler: () => void;
}

const SuccessDialog: React.FC<ISuccessDialogProps> = ({ state, closeHandler }) => {
  return (
    <Dialog open={state} keepMounted fullWidth onClose={closeHandler}>
      <div>Dane zostały zaktualizowane</div>
      <Button type="submit" variant="contained" onClick={closeHandler}>
        Zamknij
      </Button>
    </Dialog>
  );
};

export default React.memo(SuccessDialog);
