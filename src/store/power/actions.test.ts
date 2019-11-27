import * as actions from "./actions";
import * as PowerAction from "./constants";

describe("Power actions", () => {
  describe("powerOff", () => {
    it("should have proper type", () => {
      expect(actions.powerOff().type).toBe(PowerAction.OFF);
    });
  });
});
