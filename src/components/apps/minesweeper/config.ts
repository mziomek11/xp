import Vector from "../../../classes/Vector";

export default {
  sizeWithoutTiles: new Vector(27, 100),
  tileSize: 16,
  gameBoardSize: {
    easy: Vector.mul(Vector.One, 9),
    medium: Vector.mul(Vector.One, 16),
    hard: new Vector(30, 16)
  }
};
