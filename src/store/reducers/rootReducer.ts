import { combineReducers } from "redux";
import filterReducer from "store/reducers/filters/filtesReducer";
import dataReducer from "store/reducers/data/dataReducer";
import sessionDetailsReducer from "store/reducers/sessionDetails/sessionDetailsRecucer";
import drilldownReducer from "store/reducers/drilldowns/drilldownReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  data: dataReducer,
  sessionDetails: sessionDetailsReducer,
  drilldowns: drilldownReducer,
});

export default rootReducer;
