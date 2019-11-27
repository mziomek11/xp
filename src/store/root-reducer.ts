import { combineReducers } from "redux";

import windowReducer from "./window/reducer";
import fileSystemReducer from "./filesystem/reducer";
import screenReducer from "./screen/reducer";
import powerReducer from "./power/reducer";

const rootReducer = combineReducers({
  window: windowReducer,
  fileSystem: fileSystemReducer,
  screen: screenReducer,
  power: powerReducer
});

export default rootReducer;
