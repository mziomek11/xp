import {
  deepCopy,
  capitalize,
  getClassName,
  areArraysEqual,
  areObjectsEqual
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
      expect(areArraysEqual([1], [0])).toBe(false);
      expect(areArraysEqual([0], [1])).toBe(false);
      expect(areArraysEqual([1], [])).toBe(false);
      expect(areArraysEqual([], [1])).toBe(false);
      expect(areArraysEqual([1], ["1"] as any)).toBe(false);
    });
  });
});
