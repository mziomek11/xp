import React from "react";
import { shallow } from "enzyme";

import { Zoom } from "./Zoom";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";
import { ZoomSize } from "../../models";

let mockSetContextFn: jest.Mock;
let mockSetOptionsFn: jest.Mock;

const lastSelectedTool = "this is last tool" as any;

const createWrapper = () => {
  mockSetContextFn = jest.fn();
  mockSetOptionsFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setOptions: mockSetOptionsFn,
      lastSelectedTool
    } as any
  };

  return shallow<Zoom>(<Zoom {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Zoom Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseDown(Vector.Zero, true);

      expect(instance.state.isMouseButtonLeft).toBe(true);
    });
  });

  describe("handleMouseUp", () => {
    it("should call setContext with proper args", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { selectedTool: lastSelectedTool, lastSelectedTool: "zoom" }
      ]);
    });

    it("should call setOptions with default zoom", () => {
      const instance = createWrapper().instance();
      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseUp();

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([
        { zoom: ZoomSize.Default }
      ]);
    });

    it("should call setOptions with big zoom", () => {
      const instance = createWrapper().instance();
      instance.setState({ isMouseButtonLeft: true });
      instance.handleMouseUp();

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetOptionsFn.mock.calls[0]).toEqual([{ zoom: ZoomSize.Big }]);
    });
  });
});
