import { action } from "typesafe-actions";

import store from "../";
import { WindowState } from "./reducer";
import { deepCopy } from "../../utils";
import { Window } from "./models";
import * as WindowAction from "./constants";

export const open = (id: string, name: string, fullscreened: boolean) => {
  const { byId, allIds } = getCopyOfStore();

  const newWindow: Window = {
    id,
    name,
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    minimalized: false,
    fullscreened
  };
  byId[newWindow.id] = newWindow;
  allIds.unshift(id);

  return action(WindowAction.OPEN, { byId, allIds });
};

export const changePriority = (id: string) => {
  const { allIds } = getCopyOfStore(false, true);
  allIds.splice(allIds.indexOf(id), 1);
  allIds.unshift(id);

  return action(WindowAction.CHANGE_PRIORITY, { allIds });
};

export const move = (id: string, x: number, y: number) => {
  const { byId } = getCopyOfStore(true, false);
  const windowToMove = byId[id];
  windowToMove.left = x;
  windowToMove.top = y;

  return action(WindowAction.MOVE, { byId });
};

export const toggleMinimalize = (id: string) => {
  const { byId } = getCopyOfStore();
  byId[id].minimalized = !byId[id].minimalized;

  return action(WindowAction.TOGGLE_MINIMALIZE, { byId });
};

export const toggleFullscreen = (id: string) => {
  const { byId } = getCopyOfStore();
  byId[id].fullscreened = !byId[id].fullscreened;

  return action(WindowAction.TOGGLE_FULLSCREEN, { byId });
};

export const close = (id: string) => {
  const { byId, allIds } = getCopyOfStore();
  delete byId[id];
  allIds.splice(allIds.indexOf(id), 1);

  return action(WindowAction.CLOSE, { byId, allIds });
};

export const closeAll = () => action(WindowAction.CLOSE_ALL);

const getCopyOfStore = (
  copyById: boolean = true,
  copyAllIds: boolean = true
): WindowState => {
  const copy: WindowState = {
    byId: copyById ? deepCopy(store.getState().window.byId) : {},
    allIds: copyAllIds ? [...store.getState().window.allIds] : []
  };

  return copy;
};
