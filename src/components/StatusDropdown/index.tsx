import React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import _ from "lodash";

export enum SESSION_STATUS {
  LOOKING_FOR_PLAYERS = "Szukam graczy",
  LOOKING_FOR_GM = "Szukam GMa",
  LOOKING_FOR_BOTH = "Szukam GMa oraz graczy",
  FULL = "Pełna",
}

export const SESSION_STATUSES = [SESSION_STATUS.LOOKING_FOR_PLAYERS, SESSION_STATUS.LOOKING_FOR_GM, SESSION_STATUS.LOOKING_FOR_BOTH, SESSION_STATUS.FULL];

const StatusDropdown: React.FC<any> = ({ state, onChange }) => {
  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel>Status sesji</InputLabel>
      <Select value={state} onChange={onChange}>
        {_.map(SESSION_STATUSES, (status: string) => (
          <MenuItem value={status}>{status}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(StatusDropdown);
