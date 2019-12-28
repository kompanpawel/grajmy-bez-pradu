import { IFilters, MAX_PLAYER_CHANGE, SYSTEM_CHANGE } from "store/reducers/filters/types";

const INITIAL_STATE: IFilters = {
  maxPlayers: [2, 12],
  system: ""
}

const changeMaxPlayersFilter = (state: any, action: any) => ({
  ...state,
  maxPlayers: action.maxPlayers,
});

const changeSystemFilter = (state: any, action: any) => ({
  ...state,
  system: action.system,
})

const filterReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case MAX_PLAYER_CHANGE: {
      return changeMaxPlayersFilter(state, action);
    }
    case SYSTEM_CHANGE: {
      return changeSystemFilter(state, action);
    }
    default:
      return state;
  }
};

export default filterReducer;
