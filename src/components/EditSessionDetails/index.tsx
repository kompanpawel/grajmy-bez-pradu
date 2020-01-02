import React, { useEffect, useState } from "react";
import GreenTextField, { FORM_TYPES } from "components/GreenTextField";
import DatePicker from "components/DatePicker";
import moment from "moment";
import { Button, TextField } from "@material-ui/core";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import _ from "lodash";
import { connect } from "react-redux";
import StatusDropdown from "components/StatusDropdown";
import { Autocomplete } from "@material-ui/lab";
import { FETCH_SYSTEM_TYPES_DATA } from "store/reducers/data/types";
import SuccessDialog from "components/__dialogs/SuccessDialog/SuccessDialog";

interface IEditSessionDetailsProps {
  firebase: any;
  data: any;
  systems: string[];
  showSessionDetails: (data: any) => any;
  getSystemTypesData: (systems: any) => any;
}
const mapStateToProps = (state: any) => ({
  systems: state.data.systemTypes,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSystemTypesData: (systemTypes: any) => dispatch({ type: FETCH_SYSTEM_TYPES_DATA, systemTypes }),
  showSessionDetails: (data: any) => dispatch({ type: "SHOW_SESSION_DETAILS", data }),
});

const EditSessionDetails: React.FC<IEditSessionDetailsProps> = ({
  firebase,
  data,
  systems,
  showSessionDetails,
  getSystemTypesData,
}) => {
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
  const [successDialog, setSuccessDialog] = useState(false);

  useEffect(() => {
    firebase
      .systems()
      .orderByValue()
      .on("value", (snapshot: any) => {
        const array: any = [];
        snapshot.forEach((item: any) => {
          array.push(item.val());
        });
        getSystemTypesData(array);
      });
  }, [firebase, getSystemTypesData]);

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
        firebase
          .systems()
          .orderByValue()
          .once("value", (snapshot: any) => {
            const filteredData = _.filter(snapshot.val(), (item: any) => {
              return item === system;
            });
            if (filteredData.length === 0) {
              firebase.systems().push(system);
            }
          });
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
      })
      .then(() => {
        setSuccessDialog(true)
      });
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const handleSystemChange = (event: any, value: string) => {
    setSystem(value);
  };

  const isInputEmpty = (input: any) => {
    return input === "" || _.isNil(input);
  };

  const handleDialogClose = () => {
    setSuccessDialog(false);
  }

  return (
    <div>
      Dane o sesji <span>Stworzono: {data.created}</span>
      <GreenTextField label={"Nazwa sesji"} state={name} setter={setName} />
      <Autocomplete
        id="system-free"
        freeSolo
        options={systems}
        onChange={handleSystemChange}
        value={system}
        renderInput={(params) => (
          <TextField
            {...params}
            label="System"
            margin="normal"
            variant="outlined"
            fullWidth
            required
            error={isInputEmpty(system)}
            helperText={isInputEmpty(system) && "To pole należy wypełnić"}
          />
        )}
      />
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
      {successDialog && <SuccessDialog state={successDialog} closeHandler={handleDialogClose} />}
    </div>
  );
};

export default compose<IEditSessionDetailsProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(React.memo(EditSessionDetails));
