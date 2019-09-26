import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as actions from "./actions";
import * as WindowAction from "./constants";
import { WindowById } from "./models";

type WindowAction = ActionType<typeof actions>;
export type WindowState = Readonly<{
  byId: WindowById;
  allIds: string[];
  focused: string | null;
}>;

const initState: WindowState = {
  byId: {},
  allIds: [],
  focused: null
};

export default combineReducers<WindowState, WindowAction>({
  byId: (state = initState.byId, action) => {
    switch (action.type) {
      case WindowAction.OPEN:
      case WindowAction.CLOSE:
      case WindowAction.TOGGLE_MINIMALIZE:
      case WindowAction.RENAME:
        return action.payload.byId;
      case WindowAction.CLOSE_ALL:
        return {};
      case WindowAction.CHANGE_PROP_FAILED:
      case WindowAction.CLOSE_FAILED:
      default:
        return state;
    }
  },
  allIds: (state = initState.allIds, action) => {
    switch (action.type) {
      case WindowAction.OPEN:
      case WindowAction.CLOSE:
      case WindowAction.TOGGLE_MINIMALIZE:
      case WindowAction.CHANGE_PRIORITY:
        return action.payload.allIds;
      case WindowAction.CLOSE_ALL:
        return [];
      case WindowAction.CLOSE_FAILED:
      case WindowAction.CHANGE_PRIORITY_FAILED:
      default:
        return state;
    }
  },
  focused: (state = initState.focused, action) => {
    switch (action.type) {
      case WindowAction.CLOSE_ALL:
      case WindowAction.REMOVE_FOCUS:
        return null;
      case WindowAction.OPEN:
      case WindowAction.CHANGE_PRIORITY:
      case WindowAction.TOGGLE_MINIMALIZE:
      case WindowAction.CLOSE:
        return action.payload.focused;
      default:
        return state;
    }
  }
});
