import React from "react";
import { shallow } from "enzyme";

import { Tool } from "./Tool";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetContextFn = jest.fn();
const props = {
  icon: "x",
  toolType: "fill" as any,
  paint: { setContext: mockSetContextFn } as any
};

const wrapper = shallow<Tool>(<Tool {...props} />);

describe("Paint Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call setContext", () => {
      wrapper.instance().handleClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { selectedTool: props.toolType }
      ]);
    });
  });
});
