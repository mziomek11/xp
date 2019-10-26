import React from "react";
import { shallow } from "enzyme";

import { Brush } from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { BrushSize } from "../../models";

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

const wrapper = shallow<Brush>(<Brush paint={paint} />);
const instance = wrapper.instance();

describe("Paint Brush Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseLeftDown", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseLeftDown({ x: 10, y: 10 });

      expect(instance.state.isMouseButtonLeft).toBe(true);
    });
  });

  describe("handleMouseRightDown", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: true });
      instance.handleMouseRightDown({ x: 10, y: 10 });

      expect(instance.state.isMouseButtonLeft).toBe(false);
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
      const canvasPos = { x: 10, y: 15 };
      instance.setState({ lastPoint: { x: 0, y: 0 }, isMouseMoving: false });
      instance.handleMouseDown(canvasPos);

      expect(instance.state.lastPoint).toEqual(canvasPos);
      expect(instance.state.isMouseMoving).toBe(true);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Brush>(<Brush paint={paintProps} />);
      const instance = wrapper.instance();

      instance.setState({ isMouseButtonLeft: true });
      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with false", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Brush>(<Brush paint={paintProps} />);
      const instance = wrapper.instance();

      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const canvasPos = { x: 10, y: 15 };
      instance.setState({ lastPoint: { x: 0, y: 0 } });
      instance.handleMouseMove(canvasPos);

      expect(instance.state.lastPoint).toBe(canvasPos);
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
