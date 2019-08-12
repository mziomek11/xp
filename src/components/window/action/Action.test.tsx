import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Action } from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("WindowAction Component", () => {
  let onClickMockFn = jest.fn();
  let changePriorityMockFn = jest.fn();
  const comp = (
    <Action
      id="pap"
      type="exit"
      onClick={onClickMockFn}
      changePriority={changePriorityMockFn}
    />
  );
  const wrapper = shallow(comp);

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });
  });

  describe("props", () => {
    it("should add type to class name", () => {
      const expectedClass = "window__action window__action--exit";
      expect(findByTestAtrr(wrapper, "action").prop("className")).toBe(
        expectedClass
      );
    });
  });

  describe("onClick", () => {
    beforeEach(() => {
      onClickMockFn = jest.fn();
      changePriorityMockFn = jest.fn();
    });

    const getWrapperWithType = (type: "minimalize" | "exit" | "fullscreen") => {
      return shallow(
        <Action
          id="pap"
          type={type}
          onClick={onClickMockFn}
          changePriority={changePriorityMockFn}
        />
      );
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
