import Vector from "../../../classes/Vector";
import { GameBoardOptions } from "./models";

const easyOptions: GameBoardOptions = {
  size: Vector.mul(Vector.One, 9),
  bombCount: 10
};

const mediumOptions: GameBoardOptions = {
  size: Vector.mul(Vector.One, 16),
  bombCount: 40
};

const hardOptions: GameBoardOptions = {
  size: new Vector(30, 16),
  bombCount: 99
};

export default {
  sizeWithoutTiles: new Vector(27, 100),
  tileSize: 16,
  gameBoardOptions: {
    easy: easyOptions,
    medium: mediumOptions,
    hard: hardOptions
  }
};
