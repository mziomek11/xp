import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";
import { WindowById } from "./models";
import * as actions from "./actions";
import * as WindowAction from "./constants";

type WindowAction = ActionType<typeof actions>;
export type WindowState = Readonly<{
  byId: WindowById;
  allIds: string[];
}>;

const initState: WindowState = {
  byId: {},
  allIds: []
};

export default combineReducers<WindowState, WindowAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case WindowAction.OPEN:
      case WindowAction.CLOSE:
      case WindowAction.MOVE:
      case WindowAction.TOGGLE_FULLSCREEN:
      case WindowAction.TOGGLE_MINIMALIZE:
        return action.payload.byId;
      case WindowAction.CLOSE_ALL:
        return {};
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case WindowAction.OPEN:
      case WindowAction.CLOSE:
      case WindowAction.CHANGE_PRIORITY:
        return action.payload.allIds;
      case WindowAction.CLOSE_ALL:
        return [];
      default:
        return state;
    }
  }
});
