import React from "react";
import { shallow } from "enzyme";

import { TimeDigital } from "./TimeDigital";
import { findByTestAtrr } from "../../../../../../testingUtils";

const props = { minesweeper: {} as any };
const wrapper = shallow<TimeDigital>(<TimeDigital {...props} />);
const instance = wrapper.instance();

describe("Minesweeper Scoreboard TimeDigital Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      const digital = findByTestAtrr(wrapper, "digital");

      expect(digital.length).toBe(1);
      expect(digital.prop("number")).toBe(instance.state.time);
    });
  });

  describe("addSecond", () => {
    it("should add increment time", () => {
      instance.setState({ time: 10 });
      instance.addSecond();

      expect(instance.state.time).toBe(11);
    });

    it("should NOT change time", () => {
      instance.setState({ time: 999 });
      instance.addSecond();

      expect(instance.state.time).toBe(999);
    });
  });
});
