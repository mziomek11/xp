import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import * as ScreenAction from "./constants";

type ScreenAction = ActionType<typeof actions>;
export type ScreenState = Readonly<{
  width: number;
  height: number;
}>;

const initState: ScreenState = {
  width: window.innerWidth,
  height: window.innerHeight
};

export default combineReducers<ScreenState, ScreenAction>({
  width: (state = initState.width, action) => {
    switch (action.type) {
      case ScreenAction.SET_SIZE:
        return action.payload.width;
      default:
        return state;
    }
  },
  height: (state = initState.height, action) => {
    switch (action.type) {
      case ScreenAction.SET_SIZE:
        return action.payload.height;
      default:
        return state;
    }
  }
});
