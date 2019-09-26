import { action } from "typesafe-actions";

import store from "../";
import { windowConfig } from "../../config";
import * as WindowAction from "./constants";
import { WindowState } from "./reducer";
import { deepCopy } from "../../utils";
import { Window } from "./models";
import { Application } from "../models";
import { FileType } from "../filesystem/models";
import { getIcon } from "../../icons";

export const open = (
  id: string,
  application: Application,
  name: string,
  icon: FileType
) => {
  const { byId, allIds } = getCopyOfStore();

  const newWindow: Window = {
    id,
    application,
    name,
    icon: getIcon(icon),
    minimalized: windowConfig.INITIAL_MINIMALIZED
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

export const toggleMinimalize = (id: string) => {
  let { byId, allIds, focused } = getCopyOfStore();
  focused = null;

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

export const rename = (id: string, newName: string, icon?: FileType) => {
  let { byId } = getCopyOfStore();

  const windowToRename = byId[id];
  if (!windowToRename) return action(WindowAction.CHANGE_PROP_FAILED);

  windowToRename.name = newName;
  if (icon) windowToRename.icon = getIcon(icon);

  return action(WindowAction.RENAME, { byId });
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
