import React, { useEffect, useState } from "react";
import { AuthUserContext, withAuthorization } from "components/Session";
import { compose } from "recompose";
import { withFirebase } from "components/Firebase";
import GreenTextField from "components/GreenTextField";
import { Button, Checkbox, CircularProgress, Dialog, FormControlLabel } from "@material-ui/core";
import MultilineTextField from "components/MultilineTextField";
import PasswordChangeForm from "components/PasswordChangeForm";
import SuccessDialog from "components/__dialogs/SuccessDialog/SuccessDialog";

const AccountPage: React.FC<any> = ({ firebase }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [info, setInfo] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [isPlayer, setIsPlayer] = useState(true);
  const [isGM, setIsGM] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const currentUserID = firebase.auth.currentUser.uid;
    firebase
      .user(currentUserID)
      .orderByKey()
      .once("value", (snapshot: any) => {
        const receivedData = snapshot.val();
        console.log(receivedData);
        setUsername(receivedData.username);
        setEmail(receivedData.email);
        setNumber(receivedData.number);
        setInfo(receivedData.info);
        setCity(receivedData.address.city);
        setStreet(receivedData.address.street);
        setStreetNumber(receivedData.address.streetNumber);
        setIsPlayer(receivedData.roles.player);
        setIsGM(receivedData.roles.gm);
        setLoading(false);
      });
  }, [firebase]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handlePlayerCheckboxChange = (event: any) => {
    setIsPlayer(event.target.checked);
  };

  const handleGMCheckboxChange = (event: any) => {
    setIsGM(event.target.checked);
  };

  const updateData = () => {
    const currentUserID = firebase.auth.currentUser.uid;
    firebase
      .user(currentUserID)
      .update({
        username: username,
        email: email,
        info: info,
        number: number,
        roles: {
          player: isPlayer,
          gm: isGM,
        },
        address: {
          city: city,
          street: street,
          streetNumber: streetNumber,
        },
      })
      .then(() => {
        return setDialogOpen(true);
      });
  };

  const renderEditFields = () => {
    return (
      <div>
        Moje konto
        <div>Nazwa użytkownika</div>
        <GreenTextField label={""} state={username} setter={setUsername} />
        <div>Adres email (zmień)</div>
        <GreenTextField label={""} state={email} setter={setEmail} />
        <FormControlLabel
          control={<Checkbox checked={isPlayer} onChange={handlePlayerCheckboxChange} />}
          label="Jestem graczem"
        />
        <FormControlLabel
          control={<Checkbox checked={isGM} onChange={handleGMCheckboxChange} />}
          label="Jestem GMem"
        />
        <div>Numer telefonu(opcjonalny)</div>
        <GreenTextField label={""} state={number} setter={setNumber} required={false} />
        <div>Adres(opcjonalny)</div>
        <GreenTextField label={"Miasto"} state={city} setter={setCity} required={false} />
        <GreenTextField label={"Ulica"} state={street} setter={setStreet} required={false} />
        <GreenTextField label={"Numer ulicy"} state={streetNumber} setter={setStreetNumber} required={false} />
        <div>Informacje o sobie</div>
        <MultilineTextField label={""} state={info} setter={setInfo} />
        <Button type="submit" variant="contained" fullWidth onClick={updateData}>
          Zmień dane
        </Button>
        <PasswordChangeForm />
      </div>
    );
  };

  const renderLoader = () => (
    <div className="search-sessions__loader">
      <CircularProgress />
    </div>
  );

  return (
    <AuthUserContext.Consumer>
      {(authUser: any) => (
        <div>
          {loading ? renderLoader() : renderEditFields()}
          {dialogOpen && <SuccessDialog state={dialogOpen} closeHandler={handleDialogClose} />}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser: any) => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(AccountPage);
