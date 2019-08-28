import React from "react";
import { shallow } from "enzyme";

import { Application } from "./Application";
import { findByTestAtrr } from "../../../../testingUtils";

const mockToggleMinimalizeFn = jest.fn();
const mockChangePriority = jest.fn();
const props = {
  id: "WindowId",
  width: 200,
  toggleMinimalize: mockToggleMinimalizeFn,
  changePriority: mockChangePriority,
  name: "WindowName",
  focused: true
};
const wrapper = shallow<Application>(<Application {...props} />);

describe("ToolbarApplication Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "application").length).toBe(1);
    });

    it("should render application text", () => {
      expect(findByTestAtrr(wrapper, "text").length).toBe(1);
      expect(findByTestAtrr(wrapper, "text").text()).toBe(props.name);
    });
  });

  describe("props", () => {
    it("should apply width", () => {
      const wrapperStyle = findByTestAtrr(wrapper, "application").prop("style");
      const expectedStyle = {
        width: props.width
      };
      expect(wrapperStyle).toEqual(expectedStyle);
    });
  });

  describe("handleClick", () => {
    it("should call toggleMinimalize when focused", () => {
      findByTestAtrr(wrapper, "application").simulate("click");

      expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
      expect(mockChangePriority.mock.calls.length).toBe(0);
    });

    it("should call changePriority when NOT focused", () => {
      const mockToggleMinimalizeFn = jest.fn();
      const mockChangePriority = jest.fn();
      const noFocusProps = {
        ...props,
        focused: false,
        toggleMinimalize: mockToggleMinimalizeFn,
        changePriority: mockChangePriority
      };
      const noFocusWrapper = shallow(<Application {...noFocusProps} />);
      findByTestAtrr(noFocusWrapper, "application").simulate("click");

      expect(mockChangePriority.mock.calls.length).toBe(1);
      expect(mockToggleMinimalizeFn.mock.calls.length).toBe(0);
    });
  });

  describe("getClassName", () => {
    it("should return proper className when focused", () => {
      const result = wrapper.instance().getClassName();
      const expectedResult =
        "toolbar__application toolbar__application--focused";

      expect(result).toBe(expectedResult);
    });

    it("should return proper className when NOT focused", () => {
      const noFocusProps = { ...props, focused: false };
      const noFocusWrapper = shallow<Application>(
        <Application {...noFocusProps} />
      );

      const result = noFocusWrapper.instance().getClassName();
      const expectedResult = "toolbar__application";

      expect(result).toBe(expectedResult);
    });
  });
});
