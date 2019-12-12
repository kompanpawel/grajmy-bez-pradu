import { EDIT_DETAILS, TOGGLE_SESSION_DETAILS_DRILLDOWN } from "store/reducers/drilldowns/types";

const INITIAL_STATE = {
  sessionDetailsOpen: false,
  editDetails: false,
};

const toggleSessionDetailsDrilldown = (state: any, action: any) => ({
  ...state,
  sessionDetailsOpen: action.sessionDetailsOpen,
});

const editDetails = (state: any, action: any) => ({
  ...state,
  editDetails: action.editDetails,
});

const drilldownReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case TOGGLE_SESSION_DETAILS_DRILLDOWN:
      return toggleSessionDetailsDrilldown(state, action);
    case EDIT_DETAILS:
      return editDetails(state, action);
    default:
      return state;
  }
};

export default drilldownReducer;

