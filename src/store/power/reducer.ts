import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import * as PowerAction from "./constants";

type PowerAction = ActionType<typeof actions>;
export type PowerState = Readonly<{
  on: boolean;
}>;

const initState: PowerState = {
  on: true
};

export default combineReducers<PowerState, PowerAction>({
  on: (state = initState.on, action) => {
    switch (action.type) {
      case PowerAction.OFF:
        return false;
      default:
        return state;
    }
  }
});
