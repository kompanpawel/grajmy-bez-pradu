import React, { useState } from "react";
import Form from "components/Form/Form";
import GreenTextField from "components/GreenTextField";
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import _ from "lodash";
import SubmitButton from "components/Buttons/SubmitButton";
import { v1 } from "uuid";
import moment from "moment";

export enum SESSION_STATUS {
  LOOKING_FOR_PLAYERS = "Szukam graczy",
  LOOKING_FOR_GM = "Szukam GMa",
  LOOKING_FOR_BOTH = "Szukam GMa oraz graczy",
  FULL = "Pełna",
}

export const ORDERS_TABLE = [SESSION_STATUS.LOOKING_FOR_PLAYERS, SESSION_STATUS.LOOKING_FOR_GM, SESSION_STATUS.LOOKING_FOR_BOTH, SESSION_STATUS.FULL];

const NewSessionDialog: React.FC<any> = ({ firebase, closeDialog }) => {
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [localization, setLocalization] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState(SESSION_STATUS.LOOKING_FOR_PLAYERS);
  const [system, setSystem] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (event: any) => {
    const uuid = v1();
    const user = firebase.auth.currentUser.uid;
    const created = moment().format("D/MM/YYYY H:mm");
    firebase
      .session(uuid)
      .set({
        user,
        name,
        tags,
        localization,
        info,
        status,
        uuid,
        created,
        date,
        maxPlayers,
        system,
      })
      .then(() => {
        closeDialog();
        setDate("");
        setInfo("");
        setLocalization("");
        setMaxPlayers("");
        setName("");
        setTags("");
        setStatus(SESSION_STATUS.LOOKING_FOR_PLAYERS);
        setSystem("");
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const isInvalid = name === "" || system === "" ||  date === "" || maxPlayers ==="";

  return (
    <div>
      <Form title={"Dodaj sesję"} onSubmit={onSubmit}>
        <GreenTextField label={"Nazwa"} state={name} setter={setName} focused={true} />
        <GreenTextField label={"System"} state={system} setter={setSystem} />
        <GreenTextField label={"Data"} state={date} setter={setDate} />
        <GreenTextField label={"Maksymalna liczba graczy"} state={maxPlayers} setter={setMaxPlayers} />
        <GreenTextField label={"Lokalizacja"} state={localization} setter={setLocalization} required={false}/>
        <GreenTextField label={"Tagi"} state={tags} setter={setTags} required={false} />
        <GreenTextField label={"Dodatkowe info"} state={info} setter={setInfo} required={false} />
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Status sesji</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            {_.map(ORDERS_TABLE, (status: string) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <SubmitButton text={"Dodaj sesję"} isInvalid={isInvalid}/>
      </Form>
    </div>
  );
};

export default NewSessionDialog;
