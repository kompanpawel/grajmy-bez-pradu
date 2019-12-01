import { combineReducers } from "redux";
import filterReducer from "store/reducers/filters/filtesReducer";
import dataReducer from "store/reducers/data/dataReducer";
import sessionDetailsReducer from "store/reducers/sessionDetails/sessionDetailsRecucer";

const rootReducer = combineReducers({
  filters: filterReducer,
  data: dataReducer,
  sessionDetails: sessionDetailsReducer,
});

export default rootReducer;
