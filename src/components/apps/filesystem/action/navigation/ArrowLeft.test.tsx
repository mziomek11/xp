import React from "react";
import { shallow } from "enzyme";

import ArrowLeft from "./ArrowLeft";
import { findByTestAtrr } from "../../../../../../testingUtils";

const mockOnClickFn = jest.fn();
const createWrapper = (onlyIcon: boolean) => {
  const props = {
    disabled: false,
    containerClass: "containerClass",
    arrowClass: "arrowClass",
    onClick: mockOnClickFn,
    historyArrow: <div data-test="history-arrow" />,
    onlyIcon
  };

  return shallow(<ArrowLeft {...props} />);
};
const wrapper = createWrapper(false);
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

    describe("onlyIcon", () => {
      const wrapper = createWrapper(true);
      it("should NOT render text", () => {
        expect(findByTestAtrr(wrapper, "text").length).toBe(0);
      });

      it("should NOT render history arrow", () => {
        expect(findByTestAtrr(wrapper, "history-arrow").length).toBe(0);
      });
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
