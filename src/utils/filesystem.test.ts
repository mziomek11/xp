import { objectPropFromPath, pathArrayToString } from "./filesystem";

describe("Filesystem utils funtions", () => {
  describe("objectPropFromPath", () => {
    it("should return empty array and path", () => {
      expect(objectPropFromPath({}, [])).toEqual([[], []]);
    });

    it("should return data in exact path", () => {
      const tree = {
        a: {
          name: "a",
          type: "folder",
          content: {
            b: {
              name: "b",
              type: "folder",
              content: {
                c: {
                  name: "c",
                  type: "folder",
                  content: {}
                }
              }
            }
          }
        }
      };

      expect(objectPropFromPath(tree, ["a", "b"])).toEqual([
        [{ name: "c", type: "folder", content: {} }],
        ["a", "b"]
      ]);
    });

    it("should return data in path one higher", () => {
      const tree = {
        a: {
          name: "a",
          type: "folder",
          content: {}
        },
        b: {
          name: "b",
          type: "folder",
          content: {}
        }
      };

      expect(objectPropFromPath(tree, ["c"])).toEqual([
        [
          { name: "a", type: "folder", content: {} },
          { name: "b", type: "folder", content: {} }
        ],
        []
      ]);
    });
  });

  describe("pathArrayToString", () => {
    it("should return Computer", () => {
      expect(pathArrayToString([])).toBe("Computer");
    });

    it("should add \\ beetwen items", () => {
      expect(pathArrayToString(["a", "bb", "c"])).toBe("a\\bb\\c");
    });
  });
});
