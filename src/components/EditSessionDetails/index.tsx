import React, { useState } from "react";
import GreenTextField, { FORM_TYPES } from "components/GreenTextField";
import DatePicker from "components/DatePicker";
import moment from "moment";
import { Button } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import _ from "lodash";
import { connect } from "react-redux";
import StatusDropdown from "components/StatusDropdown";

interface IEditSessionDetailsProps {
  firebase: any;
  data: any;
  showSessionDetails: (data: any) => any;
}

const mapDispatchToProps = (dispatch: any) => ({
  showSessionDetails: (data: any) => dispatch({ type: "SHOW_SESSION_DETAILS", data }),
});

const EditSessionDetails: React.FC<IEditSessionDetailsProps> = ({ firebase, data, showSessionDetails }) => {
  const [name, setName] = useState(data.name);
  const [system, setSystem] = useState(data.system);
  const [maxPlayers, setMaxPlayers] = useState(data.maxPlayers);
  const [dateState, setDateState] = useState(moment(data.date, "D.MM.YYYY H:mm").toDate());
  const [status, setStatus] = useState(data.status);
  const [tags, setTags] = useState(data.tags);
  const [info, setInfo] = useState(data.info);
  const [street, setStreet] = useState(data.localization.street);
  const [streetNumber, setStreetNumber] = useState(data.localization.streetNumber);
  const [city, setCity] = useState(data.localization.city);

  const updateSessionData = () => {
    const sessionID = data.uuid;
    const formattedDate = moment(dateState).format("D.MM.YYYY H:mm");
    firebase
      .session(sessionID)
      .update({
        date: formattedDate,
        info: info,
        localization: {
          city: city,
          latitude: "",
          longitude: "",
          street: street,
          streetNumber: streetNumber,
        },
        maxPlayers: maxPlayers,
        name: name,
        status: status,
        system: system,
        tags: tags,
      })
      .then(() => {
        const updateData = _.clone(data);
        updateData.date = formattedDate;
        updateData.info = info;
        updateData.localization.city = city;
        updateData.localization.street = street;
        updateData.localization.streetNumber = streetNumber;
        updateData.maxPlayers = maxPlayers;
        updateData.name = name;
        updateData.status = status;
        updateData.system = system;
        updateData.tags = tags;
        showSessionDetails(updateData);
      });
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      Dane o sesji <span>Stworzono: {data.created}</span>
      <GreenTextField label={"Nazwa sesji"} state={name} setter={setName} />
      <GreenTextField label={"System"} state={system} setter={setSystem} />
      <GreenTextField
        label={"Maksymalna liczba graczy"}
        state={maxPlayers}
        setter={setMaxPlayers}
        type={FORM_TYPES.NUMERIC}
      />
      <DatePicker state={dateState} setter={setDateState} />
      <StatusDropdown state={status} onChange={handleStatusChange} />
      <GreenTextField label={"Tagi"} state={tags} setter={setTags} required={false} />
      <GreenTextField label={"Info"} state={info} setter={setInfo} type={FORM_TYPES.MULTILINE} required={false} />
      <div>Adres (opcjonalnie)</div>
      <GreenTextField label={"Ulica"} state={street} setter={setStreet} required={false} />
      <GreenTextField
        label={"Numer ulicy"}
        state={streetNumber}
        setter={setStreetNumber}
        required={false}
        type={FORM_TYPES.NUMERIC}
      />
      <GreenTextField label={"Miasto"} state={city} setter={setCity} required={false} />
      <Button type="submit" variant="contained" fullWidth onClick={updateSessionData}>
        Zaktualizuj dane
      </Button>
    </div>
  );
};

export default compose<IEditSessionDetailsProps, any>(
  connect(
    null,
    mapDispatchToProps
  ),
  withFirebase
)(React.memo(EditSessionDetails));
