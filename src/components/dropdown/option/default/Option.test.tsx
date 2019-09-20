import React from "react";
import { shallow } from "enzyme";

import Option, { Props } from "./Option";
import { findByTestAtrr } from "../../../../../testingUtils";

const optionName = "OptionName";

const createWrapper = (props: Partial<Props> = {}) => {
  const newProps = { ...props, name: optionName };
  return shallow(<Option {...newProps} />);
};

const wrapper = createWrapper();

describe("DropDownDefaultOption Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render name", () => {
      const name = findByTestAtrr(wrapper, "name");

      expect(name.length).toBe(1);
      expect(name.text()).toBe(optionName);
    });

    it("should render shorcut", () => {
      expect(findByTestAtrr(wrapper, "shortcut").length).toBe(1);
    });

    it("should render arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render dropdown container", () => {
      expect(findByTestAtrr(wrapper, "shortcut").length).toBe(1);
    });
  });

  describe("dropdown", () => {
    const additionalDropdown = (
      <div className="dropdown" data-test="dropdown" />
    );

    it("should render", () => {
      const props = { additionalDropdown, showDropDown: true };
      const wrapper = createWrapper(props);

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should NOT render", () => {
      const props = { additionalDropdown, showDropDown: false };
      const wrapper = createWrapper(props);

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(0);
    });
  });

  describe("onClick", () => {
    it("should call on container click", () => {
      const mockOnClick = jest.fn();
      const wrapper = createWrapper({ onClick: mockOnClick });
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(mockOnClick.mock.calls.length).toBe(1);
    });

    it("should NOT call on container click whem disabled", () => {
      const mockOnClick = jest.fn();
      const wrapper = createWrapper({ onClick: mockOnClick, disabled: true });
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(mockOnClick.mock.calls.length).toBe(0);
    });
  });

  describe("onMouseEnter", () => {
    it("should call on container mouseEnter", () => {
      const mockOnMouseEnter = jest.fn();
      const wrapper = createWrapper({ onMouseEnter: mockOnMouseEnter });
      findByTestAtrr(wrapper, "container").simulate("mouseenter");

      expect(mockOnMouseEnter.mock.calls.length).toBe(1);
    });

    it("should NOT call on container mouseEnter whem disabled", () => {
      const mockOnMouseEnter = jest.fn();
      const wrapper = createWrapper({
        onMouseEnter: mockOnMouseEnter,
        disabled: true
      });
      findByTestAtrr(wrapper, "container").simulate("mouseenter");

      expect(mockOnMouseEnter.mock.calls.length).toBe(0);
    });
  });

  describe("onMouseLeave", () => {
    it("should call on container mouseLeave", () => {
      const mockOnMouseLeave = jest.fn();
      const wrapper = createWrapper({ onMouseLeave: mockOnMouseLeave });
      findByTestAtrr(wrapper, "container").simulate("mouseleave");

      expect(mockOnMouseLeave.mock.calls.length).toBe(1);
    });

    it("should NOT call on container mouseLeave whem disabled", () => {
      const mockOnMouseLeave = jest.fn();
      const wrapper = createWrapper({
        onMouseLeave: mockOnMouseLeave,
        disabled: true
      });
      findByTestAtrr(wrapper, "container").simulate("mouseleave");

      expect(mockOnMouseLeave.mock.calls.length).toBe(0);
    });
  });
});
