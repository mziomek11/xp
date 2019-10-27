import React from "react";
import { shallow } from "enzyme";

import { Pencil } from "./Pencil";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";

const paint = {
  canvasCtx: {
    fillStyle: "y",
    fillRect: jest.fn()
  },
  primaryColor: "p",
  secondaryColor: "s",
  setColor: jest.fn()
} as any;
const wrapper = shallow<Pencil>(<Pencil paint={paint} />);
const instance = wrapper.instance();

describe("Paint Pencil Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      const newPoint = new Vector(10, 15);
      instance.setState({ lastPoint: Vector.Zero });
      instance.handleMouseDown(newPoint, true);

      expect(instance.state.lastPoint).toEqual(newPoint);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Pencil>(<Pencil paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(Vector.Zero, true);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with false", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Pencil>(<Pencil paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(Vector.Zero, false);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const newPoint = new Vector(10, 15);
      instance.setState({ lastPoint: Vector.Zero });
      instance.handleMouseMove(newPoint);

      expect(instance.state.lastPoint).toEqual(newPoint);
    });
  });
});
