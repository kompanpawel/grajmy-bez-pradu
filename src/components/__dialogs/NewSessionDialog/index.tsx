import React, { useState } from "react";
import Form from "components/Form/Form";
import GreenTextField, { FORM_TYPES } from "components/GreenTextField";
import _ from "lodash";
import SubmitButton from "components/Buttons/SubmitButton";
import { v1 } from "uuid";
import moment from "moment";
import DatePicker from "components/DatePicker";
import StatusDropdown, {SESSION_STATUS} from "components/StatusDropdown";

const NewSessionDialog: React.FC<any> = ({ firebase, closeDialog }) => {
  const [dateState, setDateState] = useState(new Date());
  const [maxPlayers, setMaxPlayers] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(SESSION_STATUS.LOOKING_FOR_PLAYERS);
  const [system, setSystem] = useState("");
  const [error, setError] = useState("");
  const onSubmit = (event: any) => {
    const uuid = v1();
    const user = firebase.auth.currentUser.uid;
    const created = moment().format("D.MM.YYYY H:mm");
    const tags = "";
    const info = "";
    const date = moment(dateState).format("D.MM.YYYY H:mm");
    const localization = {
      street: "",
      streetNumber: "",
      city: "",
      longitude: "",
      latitude: "",
    };
    firebase
      .session(uuid)
      .set({
        user,
        name,
        tags,
        info,
        status,
        uuid,
        created,
        date,
        maxPlayers,
        system,
        localization,
      })
      .then(() => {
        closeDialog();
        setDateState(new Date());
        setMaxPlayers("");
        setName("");
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

  const isInvalid = name === "" || system === "" || maxPlayers === "" || !_.isFinite(Number(maxPlayers));

  return (
    <div>
      <Form title={"Dodaj sesję"} onSubmit={onSubmit}>
        <GreenTextField label={"Nazwa"} state={name} setter={setName} focused={true} />
        <GreenTextField label={"System"} state={system} setter={setSystem} />
        <GreenTextField
          label={"Maksymalna liczba graczy"}
          state={maxPlayers}
          setter={setMaxPlayers}
          type={FORM_TYPES.NUMERIC}
        />
        <DatePicker state={dateState} setter={setDateState} />
        <StatusDropdown state={status} onChange={handleStatusChange} />
        <SubmitButton text={"Dodaj sesję"} isInvalid={isInvalid} />
      </Form>
    </div>
  );
};

export default NewSessionDialog;
