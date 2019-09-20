import React from "react";
import { shallow } from "enzyme";

import { Application } from "./Application";
import { findByTestAtrr } from "../../../../testingUtils";

let mockToggleMinimalizeFn = jest.fn();
let mockChangePriority = jest.fn();
const props = {
  id: "WindowId",
  width: 200,
  toggleMinimalize: mockToggleMinimalizeFn,
  changePriority: mockChangePriority,
  name: "WindowName",
  focused: false,
  minimalized: false,
  openedWindows: 0
};
const wrapper = shallow<Application>(<Application {...props} />);

const createWrapper = (changedProps: Partial<typeof props>) => {
  const newProps = { ...props, ...changedProps };
  return shallow<Application>(<Application {...newProps} />);
};

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
    describe("changePriority", () => {
      it("should be called when everything is false", () => {
        findByTestAtrr(wrapper, "application").simulate("click");

        expect(mockToggleMinimalizeFn.mock.calls.length).toBe(0);
        expect(mockChangePriority.mock.calls.length).toBe(1);
      });
    });

    describe("toggleMinimalize", () => {
      beforeEach(() => {
        mockToggleMinimalizeFn = jest.fn();
        mockChangePriority = jest.fn();
      });

      it("should be called when openedWindows === 1", () => {
        const wrapper = createWrapper({
          focused: false,
          minimalized: false,
          openedWindows: 1,
          toggleMinimalize: mockToggleMinimalizeFn,
          changePriority: mockChangePriority
        });

        findByTestAtrr(wrapper, "application").simulate("click");

        expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
        expect(mockChangePriority.mock.calls.length).toBe(0);
      });

      it("should be called when is focused", () => {
        const wrapper = createWrapper({
          focused: true,
          minimalized: false,
          openedWindows: 10,
          toggleMinimalize: mockToggleMinimalizeFn,
          changePriority: mockChangePriority
        });

        findByTestAtrr(wrapper, "application").simulate("click");

        expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
        expect(mockChangePriority.mock.calls.length).toBe(0);
      });

      it("should be called when is minimalized", () => {
        const wrapper = createWrapper({
          focused: false,
          minimalized: true,
          openedWindows: 10,
          toggleMinimalize: mockToggleMinimalizeFn,
          changePriority: mockChangePriority
        });

        findByTestAtrr(wrapper, "application").simulate("click");

        expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
        expect(mockChangePriority.mock.calls.length).toBe(0);
      });
    });
  });

  describe("getClassName", () => {
    const baseClass = "toolbar__application";

    it("should return proper className when focused", () => {
      const focusWrapper = createWrapper({ focused: true });
      const result = focusWrapper.instance().getClassName();
      const expectedResult = `${baseClass} ${baseClass}--focused`;

      expect(result).toBe(expectedResult);
    });

    it("should return proper className when NOT focused", () => {
      const noFocusWrapper = createWrapper({ focused: false });
      const result = noFocusWrapper.instance().getClassName();
      const expectedResult = baseClass;

      expect(result).toBe(expectedResult);
    });
  });
});
