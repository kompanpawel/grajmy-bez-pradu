const INITIAL_STATE = {
  data: {}
}

const showSessionDetails = (state: any, action: any) => ({
  ...state,
  data: action.data,
});

const sessionDetailsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SHOW_SESSION_DETAILS": {
      return showSessionDetails(state, action);
    }
    default:
      return state;
  }
}

export default sessionDetailsReducer;
