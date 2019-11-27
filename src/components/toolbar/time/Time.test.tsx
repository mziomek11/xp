import React from "react";
import { shallow } from "enzyme";

import Time from "./Time";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow<Time>(<Time />);
const instance = wrapper.instance();

describe("Time Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "time").length).toBe(1);
    });
  });

  describe("updateTime", () => {
    it("should update state", () => {
      instance.setState({ time: "time" });
      instance.updateTime();

      expect(instance.state.time).not.toBe("time");
    });
  });
});
