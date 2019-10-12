import * as ScreenAction from "./constants";
import reducer, { ScreenState } from "./reducer";

const initState: ScreenState = {
  width: 10,
  height: 10
};

describe("Screen reducer", () => {
  describe("setSize", () => {
    it("should update state", () => {
      const width: number = 20;
      const height: number = 40;
      const updatedState = reducer(initState, {
        type: ScreenAction.SET_SIZE,
        payload: { width, height }
      });

      expect(updatedState).toEqual({ width, height });
    });
  });
});
