import React from "react";
import { shallow } from "enzyme";

import ArrowRight from "./ArrowRight";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const historyArrow = <div data-test="history-arrow" />;
const props = {
  disabled: false,
  containerClass: "",
  onClick: mockOnClickFn,
  historyArrow
};
const wrapper = shallow(<ArrowRight {...props} />);
const container = findByTestAtrr(wrapper, "container");

describe("Filesystem Action ArrowRight Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(container.length).toBe(1);
    });

    it("should render direction arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render history arrow", () => {
      expect(findByTestAtrr(wrapper, "history-arrow").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call onClick", () => {
      container.simulate("click");

      expect(mockOnClickFn.mock.calls.length).toBe(1);
      expect(mockOnClickFn.mock.calls[0].length).toBe(3);
    });
  });
});
