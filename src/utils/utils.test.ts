import { deepCopy } from "./";

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
});
