import React from "react";
import { shallow } from "enzyme";

import { Brush } from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { BrushSize } from "../../models";

const paint = {
  primaryColor: "p",
  secondaryColor: "s",
  canvasCtx: {
    strokeStyle: "x",
    fillStyle: "y",
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn()
  },
  options: {
    brush: {
      size: BrushSize.Big,
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

  describe("handleMouseDown", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseDown(10, 10);

      expect(instance.state.isMouseButtonLeft).toBe(true);
    });
  });

  describe("handleContextMenu", () => {
    it("should update state", () => {
      instance.setState({ isMouseButtonLeft: true });
      instance.handleContextMenu(10, 10);

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

  describe("setColor", () => {
    it("should change stroke and fill style to primary color", () => {
      instance.setState({ isMouseButtonLeft: true });
      instance.setColor();

      expect(paint.canvasCtx.strokeStyle).toBe(paint.primaryColor);
      expect(paint.canvasCtx.fillStyle).toBe(paint.primaryColor);
    });

    it("should change stroke and fill style to secondary color", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.setColor();

      expect(paint.canvasCtx.strokeStyle).toBe(paint.secondaryColor);
      expect(paint.canvasCtx.fillStyle).toBe(paint.secondaryColor);
    });
  });

  describe("initialDraw", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ lastX: 0, lastY: 0, isMouseMoving: false });
      instance.handleMouseDown(newX, newY);

      expect(instance.state.lastX).toBe(newX);
      expect(instance.state.lastY).toBe(newY);
      expect(instance.state.isMouseMoving).toBe(true);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ lastX: 0, lastY: 0 });
      instance.handleMouseMove(newX, newY);

      expect(instance.state.lastX).toBe(newX);
      expect(instance.state.lastY).toBe(newY);
    });
  });
});
