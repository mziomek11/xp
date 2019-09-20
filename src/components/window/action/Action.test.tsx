import React from "react";
import { shallow } from "enzyme";

import { testContextData } from "../Context.test";
import { Action } from "./Action";
import { findByTestAtrr } from "../../../../testingUtils";

const actionProps = {
  type: "exit" as "exit",
  context: testContextData,
  onClick: jest.fn()
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
        type,
        onClick: onClickMockFn,
        context: { ...testContextData, changePriority: changePriorityMockFn }
      };

      return shallow(<Action {...props} />);
    };

    describe("minimalize", () => {
      it("should call only onClickMockFn once", () => {
        const minimalizeWrapper = getWrapperWithType("minimalize");
        findByTestAtrr(minimalizeWrapper, "action").simulate("click");

        expect(onClickMockFn.mock.calls.length).toBe(1);
        expect(changePriorityMockFn.mock.calls.length).toBe(0);
      });
    });

    describe("exit", () => {
      it("should call only onClickMockFn once", () => {
        const exitWrapper = getWrapperWithType("exit");
        findByTestAtrr(exitWrapper, "action").simulate("click");

        expect(onClickMockFn.mock.calls.length).toBe(1);
        expect(changePriorityMockFn.mock.calls.length).toBe(0);
      });
    });

    describe("fullscreen", () => {
      it("should call onClickMock and changePriorityMock once", () => {
        const fullScreenWrapper = getWrapperWithType("fullscreen");
        findByTestAtrr(fullScreenWrapper, "action").simulate("click");

        expect(onClickMockFn.mock.calls.length).toBe(1);
        expect(changePriorityMockFn.mock.calls.length).toBe(1);
      });
    });
  });
});
