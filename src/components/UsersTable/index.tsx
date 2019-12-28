import React, { useCallback, useState } from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import _ from "lodash";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";

export enum USER_TABLE_TYPE {
  WILLING_PLAYERS = "WILLING_PLAYERS",
  ACCEPTED_PLAYERS = "ACCEPTED_PLAYERS",
  VIEWING_PLAYERS = "VIEWING_PLAYERS",
}

interface IUsersTableProps {
  data: any;
  tableType: USER_TABLE_TYPE;
  removePlayer: any;
  acceptPlayer?: any;
}

export interface IPlayerTableData {
  username: string;
  role: string;
  uid: string;
}

const UsersTable: React.FC<IUsersTableProps> = ({ data, tableType, removePlayer, acceptPlayer }) => {
  const titleText = () => {
    return tableType !== USER_TABLE_TYPE.WILLING_PLAYERS ? "Zaakceptowani gracze" : "Oczekujący gracze";
  };

  const tableHeaders = () => {
    const commonCells = (
      <>
        <TableCell>Nazwa użytkownika</TableCell>
        <TableCell>Rola</TableCell>
      </>
    )
    switch (tableType) {
      case USER_TABLE_TYPE.WILLING_PLAYERS:
        return (
          <TableRow>
            {commonCells}
            <TableCell />
            <TableCell />
          </TableRow>
        )
      case USER_TABLE_TYPE.ACCEPTED_PLAYERS:
        return (
          <TableRow>
            {commonCells}
            <TableCell />
          </TableRow>
        )
      case USER_TABLE_TYPE.VIEWING_PLAYERS:
        return (
          <TableRow>
            {commonCells}
          </TableRow>
        )
    }
  }

  return (
    <div>
      <div>{titleText()}</div>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          {tableHeaders()}
        </TableHead>
        <TableBody>
          {_.map(data, (player: IPlayerTableData) => (
            <TableRow key={player.uid}>
              <TableCell>{player.username}</TableCell>
              <TableCell>{player.role}</TableCell>
              {tableType === USER_TABLE_TYPE.WILLING_PLAYERS && (
                <TableCell>
                  <IconButton onClick={() => acceptPlayer(player)}>
                    <CheckIcon />
                  </IconButton>
                </TableCell>
              )}
              {tableType !== USER_TABLE_TYPE.VIEWING_PLAYERS && (
                <TableCell>
                  <IconButton onClick={() => removePlayer(player)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default compose<IUsersTableProps, any>(withFirebase)(React.memo(UsersTable));
