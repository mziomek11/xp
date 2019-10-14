import { changeCursor } from "./dom";

describe("DOM utils functions", () => {
  describe("changeCursor", () => {
    it("should change cursor to given", () => {
      const newCursor: string = "se-resize";
      changeCursor(newCursor);

      expect(document.body.className).toBe(newCursor);
    });

    it("should change cursor to default", () => {
      document.body.className = "pointer";
      changeCursor();

      expect(document.body.className).toBe("");
    });
  });
});
