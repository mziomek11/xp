import Vector from "../../../classes/Vector";

export type Difficulty = "easy" | "medium" | "hard";

export type Field = {
  isBomb: boolean;
  bombsNear: number;
  checked: boolean;
  flagged: boolean;
};

export type GameBoardOptions = {
  size: Vector;
  bombCount: number;
};
