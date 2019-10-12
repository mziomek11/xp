import React from "react";
import { shallow } from "enzyme";

import { testContextData } from "../Context.test";
import { Action } from "./Action";
import { findByTestAtrr } from "../../../../testingUtils";

let mockOnClickFn: jest.Mock;
let mockChangePriorityFn: jest.Mock;

type ActionType = "minimalize" | "exit" | "fullscreen";
const createWrapper = (
  type: ActionType,
  ctxOverride: Partial<typeof testContextData> = {}
) => {
  mockOnClickFn = jest.fn();
  mockChangePriorityFn = jest.fn();

  const window = {
    ...testContextData,
    ...ctxOverride,
    changePriority: mockChangePriorityFn
  };

  const props = { type, window, onClick: mockOnClickFn };
  return shallow(<Action {...props} />);
};

const wrapper = createWrapper("exit");

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
    describe("minimalize", () => {
      it("should call only mockOnClickFn once", () => {
        const wrapper = createWrapper("minimalize");
        findByTestAtrr(wrapper, "action").simulate("click");

        expect(mockOnClickFn.mock.calls.length).toBe(1);
        expect(mockChangePriorityFn.mock.calls.length).toBe(0);
      });
    });

    describe("exit", () => {
      it("should call only mockOnClickFn once", () => {
        const wrapper = createWrapper("exit");
        findByTestAtrr(wrapper, "action").simulate("click");

        expect(mockOnClickFn.mock.calls.length).toBe(1);
        expect(mockChangePriorityFn.mock.calls.length).toBe(0);
      });
    });

    describe("fullscreen", () => {
      it("should call mockOnClickFn and mockChangePriorityFn once", () => {
        const wrapper = createWrapper("fullscreen");
        findByTestAtrr(wrapper, "action").simulate("click");

        expect(mockOnClickFn.mock.calls.length).toBe(1);
        expect(mockChangePriorityFn.mock.calls.length).toBe(1);
      });
    });
  });
});
