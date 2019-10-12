import * as actions from "./actions";
import * as ScreenAction from "./constants";

describe("Screen actions", () => {
  describe("setSize", () => {
    it("should have proper type and payload", () => {
      const width: number = 30;
      const height: number = 50;
      const action = actions.setSize(width, height);

      expect(action.type).toBe(ScreenAction.SET_SIZE);
      expect(action.payload).toEqual({ width, height });
    });
  });
});
