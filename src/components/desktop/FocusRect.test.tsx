import React from "react";
import { shallow } from "enzyme";

import { FocusRect } from "./FocusRect";
import { toolbarConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";
import Vector from "../../classes/Vector";

let mockSetContextFn: jest.Mock;
const createWrapper = (
  focusedIds: number[] = [],
  startFocusPosition: Vector = Vector.Zero
) => {
  mockSetContextFn = jest.fn();
  const props = {
    desktop: {
      setContext: mockSetContextFn,
      focusedIds,
      startFocusPosition
    } as any
  };

  return shallow<FocusRect>(<FocusRect {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("DesktopFocusRect Component", () => {
  describe("render", () => {
    it("should render", () => {
      instance.setState({ pos: Vector.One, size: Vector.One });
      expect(findByTestAtrr(wrapper, "rect").length).toBe(1);
    });

    it("should NOT render", () => {
      instance.setState({ pos: Vector.One, size: Vector.Zero });
      expect(findByTestAtrr(wrapper, "rect").length).toBe(0);
    });
  });

  describe("handleMouseMove", () => {
    const ev = { type: "mousemove", clientX: 10, clientY: 20 } as any;

    it("should call setFocusedIds with corners", () => {
      const mockSetFocusedIds = jest.fn();
      const instance = createWrapper([], Vector.Zero).instance();
      instance.setFocusedIds = mockSetContextFn;
      instance.handleMouseMove(ev);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        new Vector(0, 0),
        new Vector(10, 20)
      ]);
    });

    it("should update state", () => {
      const instance = createWrapper([], Vector.Zero).instance();
      instance.setState({ pos: new Vector(40, 50), size: new Vector(60, 70) });
      instance.handleMouseMove(ev);

      expect(instance.state.pos).toEqual(Vector.Zero);
      expect(instance.state.size).toEqual(new Vector(10, 20));
    });
  });

  describe("handleMouseUp", () => {
    it("should call setContext with focusingRect false", () => {
      const instance = createWrapper().instance();
      instance.handleMouseUp();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ focusingRect: false }]);
    });
  });

  describe("getInlineStyles", () => {
    it("should return position and size from state", () => {
      instance.setState({ size: new Vector(1, 2), pos: new Vector(3, 4) });

      expect(instance.getInlineStyles()).toEqual({
        width: 1,
        height: 2,
        left: 3,
        top: 4
      });
    });
  });
});
