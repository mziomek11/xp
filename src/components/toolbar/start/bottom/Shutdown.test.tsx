import React from "react";
import { shallow } from "enzyme";

import { Shutdown } from "./Shutdown";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockPowerOffFn = jest.fn();
const wrapper = shallow(<Shutdown powerOff={mockPowerOffFn} />);
const shutdown = findByTestAtrr(wrapper, "shutdown");

describe("StartContentBottom Shutdown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(shutdown.length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should call powerOff", () => {
      shutdown.simulate("click");

      expect(mockPowerOffFn.mock.calls.length).toBe(1);
    });
  });
});
