import React, { useState } from "react";
import AddButton from "components/Buttons/AddButton";
import { Dialog } from "@material-ui/core";
import { withFirebase } from "components/Firebase";
import NewSessionDialog from "components/__dialogs/NewSessionDialog";
import YourSessions from "components/YourSessions";

const MakeSessionPage: React.FC<any> = () => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddButton onClick={handleDialogOpen} />
      <WrappedYourSessions />
      <Dialog
        open={open}
        keepMounted
        fullWidth
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <WrappedNewSessionDialog closeDialog={handleDialogClose} />
      </Dialog>
    </div>
  );
};

const WrappedNewSessionDialog = withFirebase(NewSessionDialog);
const WrappedYourSessions = withFirebase(YourSessions);

export default MakeSessionPage;
