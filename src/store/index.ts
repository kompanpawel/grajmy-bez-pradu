import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "store/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, initialState, devTools);

export default store;
