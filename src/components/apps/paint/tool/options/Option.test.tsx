import React from "react";
import { shallow } from "enzyme";

import Option from "./Option";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const wrapper = shallow(
  <Option onClick={mockOnClickFn} focused>
    <p data-test="child" />
  </Option>
);

const option = findByTestAtrr(wrapper, "option");

describe("Paint ToolOption component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(option.length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should call onClick once", () => {
      option.simulate("click");

      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
});
