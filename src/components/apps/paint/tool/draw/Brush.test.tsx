import React from "react";
import { shallow } from "enzyme";

import { Brush } from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { BrushSize } from "../../models";
import Vector from "../../../../../classes/Vector";

const paint = {
  primaryColor: "p",
  secondaryColor: "s",
  setColor: jest.fn(),
  canvasCtx: {
    strokeStyle: "x",
    fillStyle: "y",
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    fillRect: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn()
  },
  options: {
    brush: {
      size: BrushSize.Small,
      type: "circle"
    }
  }
} as any;

const testVector: Vector = new Vector(10, 15);
const wrapper = shallow<Brush>(<Brush paint={paint} />);
const instance = wrapper.instance();

describe("Paint Brush Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseUp", () => {
    it("should update state", () => {
      instance.setState({ isMouseMoving: true });
      instance.handleMouseUp();

      expect(instance.state.isMouseMoving).toBe(false);
    });
  });

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      instance.setState({ lastPoint: Vector.Zero, isMouseMoving: false });
      instance.handleMouseDown(testVector, true);

      expect(instance.state.lastPoint).toEqual(testVector);
      expect(instance.state.isMouseMoving).toBe(true);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Brush>(<Brush paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(testVector, true);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with false", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Brush>(<Brush paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(testVector, false);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      instance.setState({ lastPoint: Vector.Zero });
      instance.handleMouseMove(testVector);

      expect(instance.state.lastPoint).toBe(testVector);
    });
  });

  describe("getSlashStartAndEndPoint", () => {
    const pos = { x: 40, y: 50 };

    it("should return proper points when is forward", () => {
      const [start, end] = instance.getSlashStartAndEndPoint(pos, true);

      expect(start).toEqual({ x: 38, y: 52 });
      expect(end).toEqual({ x: 42, y: 48 });
    });

    it("should return proper points when is NOT forward", () => {
      const [start, end] = instance.getSlashStartAndEndPoint(pos, false);

      expect(start).toEqual({ x: 42, y: 52 });
      expect(end).toEqual({ x: 38, y: 48 });
    });
  });
});
