import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import "./index.css";
import store from "./store";
import {Provider} from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
