import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "store/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
