import React from "react";
import { shallow } from "enzyme";
import { Action } from "./Action";
import { findByTestAtrr } from "../../../../testingUtils";

const actionProps = {
  id: "pap",
  type: "exit" as "exit",
  onClick: jest.fn(),
  changePriority: jest.fn()
};
const wrapper = shallow(<Action {...actionProps} />);

describe("WindowAction Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });
  });

  describe("props", () => {
    it("should add type to the className", () => {
      const expectedClass = "window__action window__action--exit";
      expect(findByTestAtrr(wrapper, "action").prop("className")).toBe(
        expectedClass
      );
    });
  });

  describe("onClick", () => {
    let onClickMockFn: jest.Mock, changePriorityMockFn: jest.Mock;

    const getWrapperWithType = (type: "minimalize" | "exit" | "fullscreen") => {
      onClickMockFn = jest.fn();
      changePriorityMockFn = jest.fn();

      const props = {
        id: "pap",
        type: type,
        onClick: onClickMockFn,
        changePriority: changePriorityMockFn
      };

      return shallow(<Action {...props} />);
    };

    it("should call onClickMock and changePriorityMock once when type is minimalize", () => {
      const minimalizeWrapper = getWrapperWithType("minimalize");
      findByTestAtrr(minimalizeWrapper, "action").simulate("click");

      expect(onClickMockFn.mock.calls.length).toBe(1);
      expect(changePriorityMockFn.mock.calls.length).toBe(1);
    });

    it("should call onClickMock and changePriorityMock once when type is fullscreen", () => {
      const fullScreenWrapper = getWrapperWithType("fullscreen");
      findByTestAtrr(fullScreenWrapper, "action").simulate("click");

      expect(onClickMockFn.mock.calls.length).toBe(1);
      expect(changePriorityMockFn.mock.calls.length).toBe(1);
    });

    it("should call only changePriorityMock once when type is exit", () => {
      const exitWrapper = getWrapperWithType("exit");
      findByTestAtrr(exitWrapper, "action").simulate("click");

      expect(onClickMockFn.mock.calls.length).toBe(1);
      expect(changePriorityMockFn.mock.calls.length).toBe(0);
    });
  });
});
