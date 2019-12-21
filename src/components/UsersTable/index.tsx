import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import _ from "lodash";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

interface IUsersTableProps {
  data: any;
}

const UsersTable: React.FC<IUsersTableProps> = ({ data }) => {
  return (
    <div>
      <div>Chętni użytkownicy</div>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa użytkownika</TableCell>
            <TableCell>Rola</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (player: any) => (
            <TableRow key={player.uid}>
              <TableCell>{player.username}</TableCell>
              <TableCell>{player.role}</TableCell>
              <TableCell>
                <IconButton>
                  <CheckIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(UsersTable);
