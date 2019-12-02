import { CHANGE_TITLE_NAME } from "store/reducers/utils/types";

const INITIAL_STATE = {
  titleName: "Strona główna"
}

const handleTitleChange = (state: any, action: any) => ({
  ...state,
  titleName: action.title
});

const utilsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case CHANGE_TITLE_NAME:
      return handleTitleChange(state, action);
    default:
      return state;
  }
}

export default utilsReducer;
