import React from "react";
import { shallow } from "enzyme";

import ArrowLeft from "./ArrowLeft";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const historyArrow = <div data-test="history-arrow" />;
const props = {
  disabled: false,
  containerClass: "",
  onClick: mockOnClickFn,
  historyArrow
};
const wrapper = shallow(<ArrowLeft {...props} />);
const container = findByTestAtrr(wrapper, "container");

describe("Filesystem Action ArrowLeft Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(container.length).toBe(1);
    });

    it("should render direction arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render text", () => {
      expect(findByTestAtrr(wrapper, "text").length).toBe(1);
    });

    it("should render history arrow", () => {
      expect(findByTestAtrr(wrapper, "history-arrow").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call onClick", () => {
      container.simulate("click");

      expect(mockOnClickFn.mock.calls.length).toBe(1);
      expect(mockOnClickFn.mock.calls[0].length).toBe(4);
    });
  });
});
