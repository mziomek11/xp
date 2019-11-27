import * as PowerAction from "./constants";
import reducer from "./reducer";

describe("Power reducer", () => {
  describe("off", () => {
    it("should update state", () => {
      const updatedReducer = reducer({ on: true }, { type: PowerAction.OFF });

      expect(updatedReducer).toEqual({ on: false });
    });
  });
});
