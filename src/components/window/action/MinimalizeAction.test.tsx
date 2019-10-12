import React from "react";
import { shallow } from "enzyme";

import { MinimalizeAction } from "./MinimalizeAction";
import { testContextData } from "../Context.test";
import { findByTestAtrr } from "../../../../testingUtils";

const mockMinimalizeWindowFn = jest.fn();
const context = {
  ...testContextData,
  toggleMinimalize: mockMinimalizeWindowFn
};
const wrapper = shallow(<MinimalizeAction window={context} />);

describe("MinimalizeAction Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });

    it("should have minimalize type", () => {
      expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("minimalize");
    });
  });

  describe("onClick", () => {
    it("should emit closeWindow", () => {
      findByTestAtrr(wrapper, "action").simulate("click");

      expect(mockMinimalizeWindowFn.mock.calls.length).toBe(1);
    });
  });
});
