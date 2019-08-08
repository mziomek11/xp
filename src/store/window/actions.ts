import { action } from "typesafe-actions";

import store from "../";
import { deepCopy } from "../../utils";
import { WindowById } from "./models";
import { MOVE_WINDOW } from "./constants";

export const moveWindow = (id: string, x: number, y: number) => {
  const newById: WindowById = deepCopy(store.getState().window.byId);
  const windowToMove = newById[id];
  windowToMove.left = x;
  windowToMove.top = y;

  return action(MOVE_WINDOW, newById);
};
