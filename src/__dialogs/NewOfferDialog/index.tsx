import React, { useState } from "react";
import Form from "components/Form/Form";
import GreenTextField from "components/GreenTextField";
import { MenuItem, Select, FormControl, InputLabel, FormHelperText } from "@material-ui/core";
import _ from "lodash";
import SubmitButton from "components/Buttons/SubmitButton";
import { v1 } from "uuid";
import moment from "moment";

export enum ORDER_STATUS {
  READY = "Do wzięcia",
  RESERVED = "Zarezerwowane",
  COMPLETED = "Oddane/Zakończone",
}

export const ORDERS_TABLE = [ORDER_STATUS.READY, ORDER_STATUS.RESERVED, ORDER_STATUS.COMPLETED];

const NewOfferDialog: React.FC<any> = ({ firebase, closeDialog }) => {
  const [name, setName] = useState("");
  const [localization, setLocalization] = useState("");
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState("");
  const [validDate, setValidDate] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState(ORDER_STATUS.READY);
  const [error, setError] = useState("");
  const onSubmit = (event: any) => {
    const uuid = v1();
    const user = firebase.auth.currentUser.uid;
    const created = moment().format("D/MM/YYYY H:mm");
    firebase
      .offer(uuid)
      .set({
        user,
        name,
        category,
        validDate,
        price,
        tags,
        localization,
        info,
        status,
        uuid,
        created
      })
      .then(() => {
        closeDialog();
      })
      .catch((error: any) => {
        setError(error);
      });
    event.preventDefault();
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Form title={"Dodaj ofertę"} onSubmit={onSubmit}>
        <GreenTextField label={"Nazwa"} state={name} setter={setName} focused={true} />
        <GreenTextField label={"Kategoria"} state={category} setter={setCategory} />
        <GreenTextField label={"Data ważności"} state={validDate} setter={setValidDate} />
        <GreenTextField label={"Cena"} state={price} setter={setPrice} />
        <GreenTextField label={"Tagi"} state={tags} setter={setTags} required={false} />
        <GreenTextField label={"Lokalizacja"} state={localization} setter={setLocalization} />
        <GreenTextField label={"Dodatkowe info"} state={info} setter={setInfo} required={false} />
        <FormControl style={{ width: "100%" }}>
          <InputLabel>Status oferty</InputLabel>
          <Select value={status} onChange={handleStatusChange}>
            {_.map(ORDERS_TABLE, (status: string) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Ustaw status oferty</FormHelperText>
        </FormControl>
        <SubmitButton text={"Dodaj ofertę"} />
      </Form>
    </div>
  );
};

export default NewOfferDialog;
