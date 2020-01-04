import React, { useEffect, useState } from "react";
import Form from "components/Form/Form";
import GreenTextField, { FORM_TYPES } from "components/GreenTextField";
import _ from "lodash";
import SubmitButton from "components/Buttons/SubmitButton";
import { v1 } from "uuid";
import moment from "moment";
import DatePicker from "components/DatePicker";
import StatusDropdown, { SESSION_STATUS } from "components/StatusDropdown";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";
import { FETCH_SYSTEM_TYPES_DATA } from "store/reducers/data/types";
import { TextField } from "@material-ui/core";
import { showError } from "utils/errors/error";

const mapStateToProps = (state: any) => ({
  systems: state.data.systemTypes,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSystemTypesData: (systemTypes: any) => dispatch({ type: FETCH_SYSTEM_TYPES_DATA, systemTypes }),
});

const NewSessionDialog: React.FC<any> = ({ firebase, closeDialog, systems, getSystemTypesData }) => {
  const [dateState, setDateState] = useState(new Date());
  const [maxPlayers, setMaxPlayers] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(SESSION_STATUS.LOOKING_FOR_PLAYERS);
  const [system, setSystem] = useState("");
  const [error, setError] = useState("");

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
        const createdRef = firebase.user(user).child("sessions").child("created");
        const pushKey = createdRef.push();
        createdRef.once("value", (snapshot: any) => {
          if (_.isNil(snapshot.val())) {
            return firebase.user(user).update({sessions: {created: {[pushKey.key]: uuid}}})
          }
          const filteredData = _.filter(snapshot.val(), (item: any) => {
            return item === uuid;
          });
          if (filteredData.length === 0) {
            createdRef.push(uuid);
          }
        })
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

  const handleSystemChange = (event: any, value: any) => {
    setSystem(value);
  };

  const isInputEmpty = (input: any) => {
    return input === "" || _.isNil(input);
  };

  const isInvalid = name === "" || isInputEmpty(system) || maxPlayers === "" || !_.isFinite(Number(maxPlayers));

  return (
    <div>
      <Form title={"Dodaj sesję"} onSubmit={onSubmit}>
        <GreenTextField label={"Nazwa"} state={name} setter={setName} focused={true} />
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
        <SubmitButton text={"Dodaj sesję"} isInvalid={isInvalid} />
      </Form>
      {error && showError(error)}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NewSessionDialog));
