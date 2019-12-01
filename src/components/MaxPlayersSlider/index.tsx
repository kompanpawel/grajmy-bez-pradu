import React from "react";
import { connect } from "react-redux";
import { MAX_PLAYER_CHANGE } from "store/reducers/filters/types";
import { Slider, Typography } from "@material-ui/core";

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

  return (
    <div>
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
        />
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(MaxPlayerSlider));
