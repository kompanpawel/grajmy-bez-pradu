import React, { useEffect, useState } from "react";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import { Button, Dialog } from "@material-ui/core";

export interface IPlayerInfoDialogProps {
  firebase: any;
  playerID: string;
  state: any;
  closeHandler: () => void;
}

const PlayerInfoDialog: React.FC<IPlayerInfoDialogProps> = ({ playerID, firebase, state, closeHandler }) => {
  const [playerInfo, setPlayerInfo] = useState({
    username: "",
    roles: {
      gm: false,
      player: false,
    },
    info: "",
    number: "",
  });

  useEffect(() => {
    firebase.user(playerID).once("value", (snapshot: any) => {
      const fetchedData = snapshot.val();
      setPlayerInfo({
        username: fetchedData.username,
        roles: {
          gm: fetchedData.roles.gm,
          player: fetchedData.roles.player,
        },
        info: fetchedData.info,
        number: fetchedData.number,
      });
    });
  });

  return (
    <Dialog open={state} keepMounted fullWidth onClose={closeHandler}>
      <div>{playerInfo.username}</div>
      <div>{playerInfo.info}</div>
      <div>{playerInfo.number}</div>
      <Button type="submit" variant="contained" onClick={closeHandler}>
        Zamknij
      </Button>
    </Dialog>
  );
};

export default compose<IPlayerInfoDialogProps, any>(withFirebase)(React.memo(PlayerInfoDialog));
