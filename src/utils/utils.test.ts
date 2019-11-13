import {
  deepCopy,
  capitalize,
  getClassName,
  areArraysEqual,
  areObjectsEqual,
  pickRandomItemsFromArray,
  areArraysValuesEqual
} from "./";

describe("Utils functions", () => {
  describe("deepCopy", () => {
    it("should NOT change original object", () => {
      const deepObj = {
        one: {
          two: {
            three: "example"
          }
        }
      };

      const copy = deepCopy<typeof deepObj>(deepObj);
      copy.one.two.three = "second example";

      expect(deepObj.one.two.three).toBe("example");
    });
  });

  describe("capitalie", () => {
    it("should return string with first letter uppercase", () => {
      expect(capitalize("window")).toBe("Window");
      expect(capitalize("boOk")).toBe("BoOk");
      expect(capitalize("Fee")).toBe("Fee");
      expect(capitalize("q")).toBe("Q");
    });
  });

  describe("areObjectsEqual", () => {
    it("should return true", () => {
      const obj = { a: "a", b: "b", c: "c" };
      expect(areObjectsEqual(obj, obj, ["a", "b", "c"])).toBe(true);
    });

    it("should return false", () => {
      const obj1 = { a: "a", b: "b" };
      const obj2 = { a: "a", b: "c" };

      expect(areObjectsEqual(obj1, obj2, ["a", "b"])).toBe(false);
    });

    it("should throw an error", () => {
      const obj1 = { a: "a", b: "b" };
      const obj2 = { a: "a", b: "b" };

      expect(() => areObjectsEqual(obj1, obj2, ["a", "b", "c"])).toThrowError();
    });
  });

  describe("getClassName", () => {
    it("should return className with focused modifier", () => {
      const baseClass = "someclass";
      const modifiers = {
        focused: true,
        dontaddthis: false
      };

      const expectedResult = "someclass someclass--focused";
      const result = getClassName(baseClass, modifiers);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("areArraysEqual", () => {
    it("should return true", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(areArraysEqual(arr, arr)).toBe(true);
      expect(areArraysEqual([], [])).toBe(true);
    });

    it("should return false", () => {
      expect(areArraysEqual([1, 0], [0, 1])).toBe(false);
      expect(areArraysEqual([1], [0])).toBe(false);
      expect(areArraysEqual([0], [1])).toBe(false);
      expect(areArraysEqual([1], [])).toBe(false);
      expect(areArraysEqual([], [1])).toBe(false);
      expect(areArraysEqual([1], ["1"] as any)).toBe(false);
    });
  });

  describe("areArraysValuesEqual", () => {
    it("should return true", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(areArraysValuesEqual(arr, arr)).toBe(true);
      expect(areArraysValuesEqual([1, 0], [0, 1])).toBe(true);
      expect(areArraysValuesEqual([1, 2, 3], [3, 2, 1])).toBe(true);
      expect(areArraysValuesEqual([], [])).toBe(true);
    });

    it("should return false", () => {
      expect(areArraysValuesEqual([1], [0])).toBe(false);
      expect(areArraysValuesEqual([0], [1])).toBe(false);
      expect(areArraysValuesEqual([1], [])).toBe(false);
      expect(areArraysValuesEqual([], [1])).toBe(false);
      expect(areArraysValuesEqual([1], ["1"] as any)).toBe(false);
    });
  });

  describe("pickRandomItemsFromArray", () => {
    it("should throw an error", () => {
      expect(() => pickRandomItemsFromArray([], 101)).toThrow();
      expect(() => pickRandomItemsFromArray([], -1)).toThrow();
    });

    it("should contain all pieces from start array", () => {
      const startArr = [10, 22, 13, 10, -5];
      const randomedArr = pickRandomItemsFromArray(startArr, 100);

      expect(startArr.length).toBe(randomedArr.length);

      randomedArr.forEach(item => {
        expect(startArr.indexOf(item)).toBeGreaterThan(-1);
      });
    });

    it("should return empty array", () => {
      const startArr = [10, 22, 13, 10, -5];
      const randomedArr = pickRandomItemsFromArray(startArr, 0);

      expect(randomedArr.length).toBe(0);
    });

    it("should return three items", () => {
      const startArr = [10, 15, 20, 44, 11, 6];
      const randomedArr = pickRandomItemsFromArray(startArr, 50);

      expect(randomedArr.length).toBe(3);
    });
  });
});
