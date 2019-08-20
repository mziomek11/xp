import { deepCopy, capitalize } from "./";

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
});
