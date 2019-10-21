import React from "react";
import { shallow } from "enzyme";

import { Brush } from "./Brush";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { BrushSize } from "../../models";

const paint = {
  primaryColor: "z",
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

  describe("setColor", () => {
    it("should change stroke and fill style", () => {
      instance.setColor();

      expect(paint.canvasCtx.strokeStyle).toBe(paint.primaryColor);
      expect(paint.canvasCtx.fillStyle).toBe(paint.primaryColor);
    });
  });

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ lastX: 0, lastY: 0 });
      instance.handleMouseDown(newX, newY);

      expect(instance.state.lastX).toBe(newX);
      expect(instance.state.lastY).toBe(newY);
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
