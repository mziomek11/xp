import { deepCopy, capitalize, getClassName } from "./";

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

      const copy = deepCopy(deepObj);
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
});
