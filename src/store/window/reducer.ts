import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";
import { WindowById } from "./models";
import * as actions from "./actions";
import * as WindowAction from "./constants";

type WindowAction = ActionType<typeof actions>;
type WindowState = Readonly<{
  byId: WindowById;
  allIds: string[];
}>;

const initState: WindowState = {
  byId: {
    "1": {
      id: "1",
      name: "Chrome",
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
      width: 170,
      height: 170
    },
    "2": {
      id: "2",
      name: "Chrome",
      top: 0,
      left: 0,
      width: 170,
      height: 170
    }
  },
  allIds: ["1", "2"]
};

export default combineReducers<WindowState, WindowAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case WindowAction.MOVE_WINDOW:
        return action.payload;
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      default:
        return state;
    }
  }
});
