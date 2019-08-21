import { action } from "typesafe-actions";

import store from "../";
import { windowConfig } from "../../config";
import * as WindowAction from "./constants";
import { WindowState } from "./reducer";
import { deepCopy } from "../../utils";
import { Window } from "./models";

export const open = (
  id: string,
  application: string,
  name: string,
  fullscreened: boolean
) => {
  const { byId, allIds } = getCopyOfStore();

  const newWindow: Window = {
    id,
    application,
    name,
    width: windowConfig.INITIAL_WIDTH,
    height: windowConfig.INITIAL_HEIGHT,
    left: windowConfig.INITIAL_LEFT,
    top: windowConfig.INITIAL_TOP,
    minimalized: windowConfig.INITIAL_MINIMALIZED,
    fullscreened
  };
  byId[newWindow.id] = newWindow;
  allIds.push(id);

  return action(WindowAction.OPEN, { byId, allIds, focused: id });
};

export const changePriority = (id: string) => {
  const { allIds } = getCopyOfStore(false, true);
  if (allIds.indexOf(id) === -1) {
    return action(WindowAction.CHANGE_PRIORITY_FAILED);
  }

  allIds.splice(allIds.indexOf(id), 1);
  allIds.push(id);

  return action(WindowAction.CHANGE_PRIORITY, { allIds, focused: id });
};

export const move = (id: string, x: number, y: number) => {
  const { byId } = getCopyOfStore(true, false);
  const windowToMove = byId[id];
  if (!windowToMove) return action(WindowAction.CHANGE_PROP_FAILED);

  windowToMove.left = x;
  windowToMove.top = y;
  return action(WindowAction.MOVE, { byId });
};

export const resize = (id: string, width: number, height: number) => {
  const { byId } = getCopyOfStore(true, false);
  const windowToResize = byId[id];
  if (!windowToResize) return action(WindowAction.CHANGE_PROP_FAILED);

  windowToResize.width = Math.max(width, windowConfig.MINIMAL_WIDTH);
  windowToResize.height = Math.max(height, windowConfig.MINIMAL_HEIGHT);
  return action(WindowAction.RESIZE, { byId });
};

export const moveAndResize = (
  id: string,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const { byId } = getCopyOfStore(true, false);
  const windowChange = byId[id];
  if (!windowChange) return action(WindowAction.CHANGE_PROP_FAILED);

  windowChange.width = Math.max(width, windowConfig.MINIMAL_WIDTH);
  windowChange.height = Math.max(height, windowConfig.MINIMAL_HEIGHT);
  windowChange.left = x;
  windowChange.top = y;
  return action(WindowAction.MOVE_AND_RESIZE, { byId });
};

export const toggleMinimalize = (id: string) => {
  let { byId, allIds, focused } = getCopyOfStore();
  const windowToMinimalize = byId[id];
  if (!windowToMinimalize) return action(WindowAction.CHANGE_PROP_FAILED);

  if (windowToMinimalize.minimalized) {
    allIds.splice(allIds.indexOf(id), 1);
    allIds.push(id);
    focused = id;
  }

  windowToMinimalize.minimalized = !windowToMinimalize.minimalized;
  return action(WindowAction.TOGGLE_MINIMALIZE, { byId, allIds, focused });
};

export const toggleFullscreen = (id: string) => {
  const { byId } = getCopyOfStore();
  const windowToFullscreen = byId[id];
  if (!windowToFullscreen) return action(WindowAction.CHANGE_PROP_FAILED);

  windowToFullscreen.fullscreened = !windowToFullscreen.fullscreened;
  return action(WindowAction.TOGGLE_FULLSCREEN, { byId });
};

export const close = (id: string) => {
  let { byId, allIds, focused } = getCopyOfStore();
  if (allIds.indexOf(id) === -1) return action(WindowAction.CLOSE_FAILED);

  delete byId[id];
  const posInArray: number = allIds.indexOf(id);
  if (posInArray >= 0) allIds.splice(allIds.indexOf(id), 1);
  if (focused === id) focused = null;

  return action(WindowAction.CLOSE, { byId, allIds, focused });
};

export const removeFocus = () => action(WindowAction.REMOVE_FOCUS);

export const closeAll = () => action(WindowAction.CLOSE_ALL);

const getCopyOfStore = (
  copyById: boolean = true,
  copyAllIds: boolean = true
): WindowState => {
  const windowState = store.getState().window;
  const copy: WindowState = {
    byId: copyById ? deepCopy(windowState.byId) : {},
    allIds: copyAllIds ? [...windowState.allIds] : [],
    focused: windowState.focused
  };

  return copy;
};
