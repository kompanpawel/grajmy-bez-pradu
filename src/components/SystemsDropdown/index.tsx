import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { InputLabel, NativeSelect, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { FETCH_SYSTEM_TYPES_DATA } from "store/reducers/data/types";
import { SYSTEM_CHANGE } from "store/reducers/filters/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withFirebase } from "components/Firebase";
import { compose } from "recompose";

const mapStateToProps = (state: any) => ({
  systems: state.data.systemTypes,
  activeSystem: state.filters.system,
});

const mapDispatchToProps = (dispatch: any) => ({
  getSystemTypesData: (systemTypes: any) => dispatch({ type: FETCH_SYSTEM_TYPES_DATA, systemTypes }),
  changeSystemFilter: (system: any) => dispatch({ type: SYSTEM_CHANGE, system }),
});

const SystemsDropdown: React.FC<any> = ({
  firebase,
  getSystemTypesData,
  activeSystem,
  changeSystemFilter,
  systems,
}) => {
  const handleChange = (event: any, value: string) => {
    if (value === null) {
      return changeSystemFilter("");
    }
    changeSystemFilter(value);
  };

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

  return (
    <div>
      <Autocomplete
        id="systems"
        options={systems}
        getOptionLabel={(option: string) => option}
        onChange={handleChange}
        loading={_.isNil(systems)}
        renderInput={(params) => <TextField {...params} label="Wybierz system" variant="outlined" margin="normal" fullWidth />}
      />
    </div>
  );
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withFirebase)(React.memo(SystemsDropdown));
