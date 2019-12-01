import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { InputLabel, NativeSelect } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { FETCH_SYSTEM_TYPES_DATA } from "store/reducers/data/types";
import { SYSTEM_CHANGE } from "store/reducers/filters/types";

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
  const handleChange = (event: any) => {
    changeSystemFilter(event.target.value);
  };

  useEffect(() => {
    firebase.sessions().on("value", (snapshot: any) => {
      const array: any = [];
      snapshot.forEach((item: any) => {
        array.push(item.val().system);
      });
      getSystemTypesData(array);
    });
  }, [firebase, getSystemTypesData]);

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="system-dropdown">System</InputLabel>
        <NativeSelect value={activeSystem} onChange={handleChange}>
          <option value="" />
          {_.map(systems, (item: string, index: number) => (
            <option value={item} key={index}>{item}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SystemsDropdown));
