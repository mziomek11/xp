import uuid from "uuid";

import { WindowState } from "./reducer";
import { windowConfig } from "../../config";
import { Application } from "../models";
import { Window } from "./models";
import { deepCopy } from "../../utils/";
import { getIcon } from "../../icons";

export const windowId = uuid();
export const secondWindowId = uuid();
export const applicationName: Application = "filesystem";
export const windowIcon = "filesystem";
export const windowName: string = "WindowName";

export const getWindowData = (id: string): Window => {
  return {
    id,
    application: applicationName,
    name: windowName,
    icon: getIcon(windowIcon),
    minimalized: windowConfig.INITIAL_MINIMALIZED
  };
};

export const getStateWithChangedProps = (
  oldState: WindowState,
  propsToOverride: {}
): WindowState => {
  let newState: WindowState = deepCopy(oldState);
  newState.byId[windowId] = { ...newState.byId[windowId], ...propsToOverride };

  return newState;
};

export const emptyState: WindowState = {
  byId: {},
  allIds: [],
  focused: null
};

export const stateWithOneWindow: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId)
  },
  allIds: [windowId],
  focused: windowId
};

export const stateWithChangedMinimalize: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { minimalized: true }
);

export const stateWithFocusedNull: WindowState = {
  ...stateWithOneWindow,
  focused: null
};

export const stateWithTwoWindows: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId),
    [secondWindowId]: getWindowData(secondWindowId)
  },
  allIds: [windowId, secondWindowId],
  focused: windowId
};
