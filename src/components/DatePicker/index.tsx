import React from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface IDatePickerProps {
  state: Date;
  setter: any;
}
const DatePicker: React.FC<IDatePickerProps> = ({ state, setter }) => {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker autoOk ampm={false} disablePast value={state} onChange={setter} label="Data i godzina" />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default React.memo(DatePicker);
