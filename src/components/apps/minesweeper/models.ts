import Vector from "../../../classes/Vector";

export type Field = {
  isBomb: boolean;
  bombsNear: number;
  checked: boolean;
};

export type GameBoardOptions = {
  size: Vector;
  bombCount: number;
};
