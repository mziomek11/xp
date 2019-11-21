import Vector from "../classes/Vector";
import minesweeperConfig from "../components/apps/minesweeper/config";
import menuConfig from "../components/menu/config";
import { Field, Difficulty } from "../components/apps/minesweeper/models";
import { GameBoardOptions } from "../components/apps/minesweeper/models";
import { pickRandomItemsFromArray } from ".";

export function getMinesweeperSize(difficulty: Difficulty): Vector {
  const { sizeWithoutTiles, tileSize, gameBoardOptions } = minesweeperConfig;
  const boardSize = gameBoardOptions[difficulty].size;

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

export function generateStartFields({
  size,
  bombCount
}: GameBoardOptions): Field[] {
  const fields = createInitialFieldsArray(size);
  fillFieldsWithBombs(bombCount, fields);
  calculateBombsNear(size, fields);

  return fields;
}

export function createInitialFieldsArray(size: Vector): Field[] {
  return new Array(size.x * size.y).fill(0).map(x => ({
    isBomb: false,
    bombsNear: 0,
    checked: false,
    flagged: false
  }));
}

export function fillFieldsWithBombs(bombCount: number, fields: Field[]) {
  const [, bombIndexes] = pickRandomItemsFromArray(fields, bombCount);
  bombIndexes.forEach(i => {
    fields[i].isBomb = true;
  });
}

export function calculateBombsNear(size: Vector, fields: Field[]) {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (field.isBomb) continue;

    const fieldPos = convertIndexIntoFieldPosition(size, i);
    const addBombNearFn = (index: number) => {
      if (fields[index].isBomb) field.bombsNear++;
    };

    loopThroughFieldsAround(size, fieldPos, addBombNearFn);
  }
}

export function convertIndexIntoFieldPosition(
  boardSize: Vector,
  index: number
): Vector {
  if (index < 0) throw Error("Index is less than 0");
  if (index >= boardSize.y * boardSize.x)
    throw Error("Index is bigger or equal board length");

  const fieldY = Math.floor(index / boardSize.x);
  const fieldX = index - fieldY * boardSize.x;

  return new Vector(fieldX, fieldY);
}

export function makeChecked(boardSize: Vector, fields: Field[], index: number) {
  const field = fields[index];
  if (field.checked || field.flagged) return;

  field.checked = true;
  if (field.bombsNear === 0 && !field.isBomb) {
    const fieldPos = convertIndexIntoFieldPosition(boardSize, index);
    const loopFn = (fieldIndex: number) => {
      makeChecked(boardSize, fields, fieldIndex);
    };

    loopThroughFieldsAround(boardSize, fieldPos, loopFn);
  }
}

export function loopThroughFieldsAround(
  boardSize: Vector,
  fieldPos: Vector,
  fn: (targetIndex: number) => void
) {
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x === 0 && y === 0) continue;

      const targetX = fieldPos.x + x;
      if (targetX < 0 || targetX >= boardSize.x) continue;

      const targetY = fieldPos.y + y;
      if (targetY < 0 || targetY >= boardSize.y) continue;

      const targetIndex = targetY * boardSize.x + targetX;
      fn(targetIndex);
    }
  }
}
