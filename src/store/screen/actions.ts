import { action } from "typesafe-actions";

import * as ScreenAction from "./constants";

export const setSize = (width: number, height: number) =>
  action(ScreenAction.SET_SIZE, { width, height });
