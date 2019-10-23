import React, { useState } from "react";
import Form from "components/Form/Form";
import GreenTextField from "components/GreenTextField";
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import _ from "lodash";

enum ORDER_STATUS {
  READY = "Do wzięcia",
  RESERVED = "Zarezerwowane",
  COMPLETED = "Oddane/Zakończone",
}

const ORDERS_TABLE = [ORDER_STATUS.READY, ORDER_STATUS.RESERVED, ORDER_STATUS.COMPLETED];

const NewOfferDialog: React.FC<any> = () => {
  const [localization, setLocalization] = useState("");
  const [info, setInfo] = useState("");
  const [status, setStatus] = useState(ORDER_STATUS.READY);
  const onSubmit = () => {
    console.log("submit");
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Form title={"Dodaj ofertę"} onSubmit={onSubmit}>
        <GreenTextField label={"Lokalizacja"} state={localization} setter={setLocalization} />
        <GreenTextField label={"Dodatkowe info"} state={info} setter={setInfo} required={false} />
        <FormControl style={{width: "100%"}}>
          <InputLabel>Status oferty</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            {_.map(ORDERS_TABLE, (status: string) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Ustaw status oferty</FormHelperText>
        </FormControl>
      </Form>
    </div>
  );
};

export default NewOfferDialog;
