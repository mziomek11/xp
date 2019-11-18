import Vector from "../classes/Vector";
import minesweeperConfig from "../components/apps/minesweeper/config";
import menuConfig from "../components/menu/config";

type Difficulty = "easy" | "medium" | "hard";

export function getMinesweeperSize(difficulty: Difficulty): Vector {
  const { sizeWithoutTiles, tileSize, gameBoardSize } = minesweeperConfig;
  const boardSize = gameBoardSize[difficulty];

  const width = sizeWithoutTiles.x + boardSize.x * tileSize;
  const height =
    menuConfig.height + sizeWithoutTiles.y + boardSize.y * tileSize;

  return new Vector(width, height);
}

export function splitNumberIntoThreeStringDigits(
  x: number
): [string, string, string] {
  if (x >= 1000) throw Error("Number is equal or bigger than 1000");
  if (x < 0) throw Error("Number is less than 0");

  const stringNumber: string = x.toString();

  if (x < 10) return ["0", "0", stringNumber[0]];
  else if (x < 100) return ["0", stringNumber[0], stringNumber[1]];
  else return [stringNumber[0], stringNumber[1], stringNumber[2]];
}
