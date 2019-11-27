import { action } from "typesafe-actions";

import * as PowerAction from "./constants";

export const powerOff = () => action(PowerAction.OFF);
