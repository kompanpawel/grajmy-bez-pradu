import React from "react";
import { connect } from "react-redux";
import { MAX_PLAYER_CHANGE } from "store/reducers/filters/types";
import { Slider, Typography } from "@material-ui/core";
import "./MaxPlayersSlider.scss";

const mapStateToProps = (state: any) => ({
  maxPlayers: state.filters.maxPlayers,
});

const mapDispatchToProps = (dispatch: any) => ({
  changeMaxPlayersFilter: (maxPlayers: number[]) => dispatch({ type: MAX_PLAYER_CHANGE, maxPlayers }),
});

const MaxPlayerSlider: React.FC<any> = ({ maxPlayers, changeMaxPlayersFilter }) => {
  const handleMaxPlayersChange = (event: any, newValue: number | number[]) => {
    changeMaxPlayersFilter(newValue as number[]);
  };

  const valueText = (value: number) => {
    return `${value}`;
  };

  const marks = [
    { value: 2, label: "2" },
    { value: 4, label: "4" },
    { value: 6, label: "6" },
    { value: 8, label: "8" },
    { value: 10, label: "10" },
    { value: 12, label: "12" },
  ];

  return (
    <div className="max-players-slider">
      <Typography id="max-players-slider" gutterBottom>
        Max players
      </Typography>
      <Slider
        value={maxPlayers}
        onChange={handleMaxPlayersChange}
        valueLabelDisplay="auto"
        aria-labelledby="max-players-slider"
        getAriaValueText={valueText}
        min={2}
        max={12}
        marks={marks}
      />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MaxPlayerSlider));
