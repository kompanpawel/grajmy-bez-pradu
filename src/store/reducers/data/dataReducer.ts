import { CHANGE_SESSION_DATA, FETCH_SESSIONS_DATA, FETCH_SYSTEM_TYPES_DATA } from "store/reducers/data/types";

const INITIAL_STATE = {
  systemTypes: [],
  sessions: [],
};

const getSessionsData = (state: any, action: any) => ({
  ...state,
  sessions: action.sessions,
})

const getSystemTypesData = (state: any, action: any) => ({
  ...state,
  systemTypes: action.systemTypes,
});

const changeSessionData = (state: any, action: any) => ({
  ...state,
  sessions: {
    ...state.sessions,
    [action.uid]: action.session,
  },
});

const dataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FETCH_SYSTEM_TYPES_DATA: {
      return getSystemTypesData(state, action);
    }
    case FETCH_SESSIONS_DATA: {
      return getSessionsData(state, action);
    }
    case CHANGE_SESSION_DATA: {
      return changeSessionData(state, action);
    }
    default:
      return state;
  }
};

export default dataReducer;
