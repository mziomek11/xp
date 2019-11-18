import { splitNumberIntoThreeStringDigits } from "./minesweeper";

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
});
