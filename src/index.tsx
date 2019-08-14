import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Screen from "./components/screen/Screen";
import store from "./store";
import "./styles/main.scss";

ReactDOM.render(
  <Provider store={store}>
    <Screen />
  </Provider>,
  document.getElementById("app")
);
