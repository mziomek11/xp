import React from "react";
import { shallow } from "enzyme";

import HistoryArrow, { Props } from "./HistoryArrow";
import { findByTestAtrr } from "../../../../../../testingUtils";

let mockSetOpenFn: jest.Mock;

const dropdownOptions = [{ name: "name", onClick: jest.fn() }];
const createWrapper = (propsToOverride: Partial<Props> = {}) => {
  mockSetOpenFn = jest.fn();
  const defaultProps = {
    isOpen: true,
    disabled: false,
    setOpen: mockSetOpenFn,
    dropdownOptions: dropdownOptions
  };

  const newProps = { ...defaultProps, ...propsToOverride };
  return shallow<HistoryArrow>(<HistoryArrow {...newProps} />);
};

const wrapper = createWrapper();

describe("Filesystem Action HistoryArrowDropDown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "arrow-container").length).toBe(1);
    });

    it("should render arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render dropdown", () => {
      const openedWrapper = createWrapper({ isOpen: true });
      const dropdown = findByTestAtrr(openedWrapper, "dropdown");

      expect(dropdown.length).toBe(1);
      expect(dropdown.prop("options")).toEqual(dropdownOptions);
    });

    it("should NOT render dropdown", () => {
      const closedWrapper = createWrapper({ isOpen: false });
      expect(findByTestAtrr(closedWrapper, "dropdown").length).toBe(0);
    });
  });

  describe("handleClick", () => {
    it("should NOT call setOpen when is open", () => {
      const closedWrapper = createWrapper({ isOpen: true, disabled: false });
      findByTestAtrr(closedWrapper, "arrow-container").simulate("click");

      expect(mockSetOpenFn.mock.calls.length).toBe(0);
      expect(closedWrapper.instance().state.isClickOpening).toBe(false);
    });

    it("should NOT call setOpen when is disabled", () => {
      const disableWrapper = createWrapper({ isOpen: true, disabled: true });
      findByTestAtrr(disableWrapper, "arrow-container").simulate("click");

      expect(mockSetOpenFn.mock.calls.length).toBe(0);
      expect(disableWrapper.instance().state.isClickOpening).toBe(false);
    });

    it("should be called setOpen", () => {
      const wrapper = createWrapper({ isOpen: false, disabled: false });
      findByTestAtrr(wrapper, "arrow-container").simulate("click");

      expect(mockSetOpenFn.mock.calls.length).toBe(1);
      expect(wrapper.instance().state.isClickOpening).toBe(true);
    });
  });

  describe("listenForClick", () => {
    it("should call setState", () => {
      const instance = createWrapper().instance();

      instance.setState({ isClickOpening: true });
      instance.listenForClick();

      expect(instance.state.isClickOpening).toBe(false);
      expect(mockSetOpenFn.mock.calls.length).toBe(0);
    });

    it("should call setOpen", () => {
      const instance = createWrapper().instance();

      instance.setState({ isClickOpening: false });
      instance.listenForClick();

      expect(instance.state.isClickOpening).toBe(false);
      expect(mockSetOpenFn.mock.calls.length).toBe(1);
    });
  });
});
