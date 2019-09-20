import { combineReducers } from "redux";

import windowReducer from "./window/reducer";
import fileSystemReducer from "./filesystem/reducer";

const rootReducer = combineReducers({
  window: windowReducer,
  fileSystem: fileSystemReducer
});

export default rootReducer;
