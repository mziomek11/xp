import {
  splitNumberIntoThreeStringDigits,
  createInitialFieldsArray,
  calculateBombsNear,
  convertIndexIntoFieldPosition,
  loopThroughFieldsAround
} from "./minesweeper";
import Vector from "../classes/Vector";
import { Field } from "../components/apps/minesweeper/models";

describe("Minesweeper utils functions", () => {
  describe("splitNumberIntoThreeStringDigits", () => {
    it("should throw an error", () => {
      expect(() => splitNumberIntoThreeStringDigits(-1)).toThrow();
      expect(() => splitNumberIntoThreeStringDigits(1000)).toThrow();
    });

    it("should return splitted string array", () => {
      expect(splitNumberIntoThreeStringDigits(0)).toEqual(["0", "0", "0"]);
      expect(splitNumberIntoThreeStringDigits(9)).toEqual(["0", "0", "9"]);
      expect(splitNumberIntoThreeStringDigits(10)).toEqual(["0", "1", "0"]);
      expect(splitNumberIntoThreeStringDigits(11)).toEqual(["0", "1", "1"]);
      expect(splitNumberIntoThreeStringDigits(55)).toEqual(["0", "5", "5"]);
      expect(splitNumberIntoThreeStringDigits(99)).toEqual(["0", "9", "9"]);
      expect(splitNumberIntoThreeStringDigits(100)).toEqual(["1", "0", "0"]);
      expect(splitNumberIntoThreeStringDigits(101)).toEqual(["1", "0", "1"]);
      expect(splitNumberIntoThreeStringDigits(111)).toEqual(["1", "1", "1"]);
      expect(splitNumberIntoThreeStringDigits(234)).toEqual(["2", "3", "4"]);
      expect(splitNumberIntoThreeStringDigits(999)).toEqual(["9", "9", "9"]);
    });
  });

  describe("createInitialFieldsArray", () => {
    it("should return 6 items array filled with initial fields", () => {
      const initF = {
        isBomb: false,
        bombsNear: 0,
        checked: false,
        flagged: false
      };
      const expResult = [initF, initF, initF, initF, initF, initF];

      const res1 = createInitialFieldsArray(new Vector(3, 2));
      const res2 = createInitialFieldsArray(new Vector(2, 3));

      expect(res1).toEqual(expResult);
      expect(res2).toEqual(expResult);
    });
  });

  describe("calculateBombsNear", () => {
    //Create field
    const cf = (isBomb: boolean = false): Field => ({
      isBomb,
      flagged: false,
      checked: false,
      bombsNear: 0
    });

    it("should update fields", () => {
      const size: Vector = Vector.mul(Vector.One, 3);
      const fields: Field[] = [
        cf(true),
        cf(true),
        cf(),
        cf(true),
        cf(true),
        cf(),
        cf(),
        cf(),
        cf()
      ];

      calculateBombsNear(size, fields);
      const [f1, f2, f3, f4, f5, f6, f7, f8, f9] = fields;
      expect(f1.bombsNear).toBe(0);
      expect(f2.bombsNear).toBe(0);
      expect(f3.bombsNear).toBe(2);
      expect(f4.bombsNear).toBe(0);
      expect(f6.bombsNear).toBe(2);
      expect(f6.bombsNear).toBe(2);
      expect(f7.bombsNear).toBe(2);
      expect(f8.bombsNear).toBe(2);
      expect(f9.bombsNear).toBe(1);
    });
  });

  describe("convertIndexIntoFieldPosition", () => {
    const convert = convertIndexIntoFieldPosition;
    const boardSize: Vector = new Vector(10, 5);

    it("should throw an error", () => {
      expect(() => convert(boardSize, -1)).toThrow();
      expect(() => convert(boardSize, 50)).toThrow();
    });

    it("should NOT throw an eror", () => {
      expect(() => convert(boardSize, 0)).not.toThrow();
      expect(() => convert(boardSize, 49)).not.toThrow();
    });

    it("should convert properly", () => {
      expect(convert(boardSize, 0)).toEqual(new Vector(0, 0));
      expect(convert(boardSize, 49)).toEqual(new Vector(9, 4));
      expect(convert(boardSize, 9)).toEqual(new Vector(9, 0));
      expect(convert(boardSize, 10)).toEqual(new Vector(0, 1));
      expect(convert(boardSize, 11)).toEqual(new Vector(1, 1));
    });
  });

  describe("loopThroughFieldsAround", () => {
    it("should call fn everywhere expect middle", () => {
      const mockFn = jest.fn();
      loopThroughFieldsAround(new Vector(3, 3), new Vector(1, 1), mockFn);

      expect(mockFn.mock.calls.length).toBe(8);
      const [c1, c2, c3, c4, c5, c6, c7, c8] = mockFn.mock.calls;

      expect(c1).toEqual([0]);
      expect(c2).toEqual([3]);
      expect(c3).toEqual([6]);
      expect(c4).toEqual([1]);
      expect(c5).toEqual([7]);
      expect(c6).toEqual([2]);
      expect(c7).toEqual([5]);
      expect(c8).toEqual([8]);
    });

    it("should call fn everywhere expect top left", () => {
      const mockFn = jest.fn();
      loopThroughFieldsAround(new Vector(2, 2), Vector.Zero, mockFn);

      expect(mockFn.mock.calls.length).toBe(3);
      const [c1, c2, c3] = mockFn.mock.calls;

      expect(c1).toEqual([2]);
      expect(c2).toEqual([1]);
      expect(c3).toEqual([3]);
    });
  });
});
