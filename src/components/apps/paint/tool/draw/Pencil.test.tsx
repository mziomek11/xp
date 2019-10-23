import React from "react";
import { shallow } from "enzyme";

import { Pencil } from "./Pencil";
import { findByTestAtrr } from "../../../../../../testingUtils";

const paint = {
  canvasCtx: {
    fillStyle: "y",
    fillRect: jest.fn()
  },
  primaryColor: "p",
  secondaryColor: "s"
} as any;
const wrapper = shallow<Pencil>(<Pencil paint={paint} />);
const instance = wrapper.instance();

describe("Paint Pencil Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("setColor", () => {
    it("should change stroke and fill style to primary color", () => {
      instance.setState({ isMouseButtonLeft: true });
      instance.setColor();

      expect(paint.canvasCtx.fillStyle).toBe(paint.primaryColor);
    });

    it("should change stroke and fill style to secondary color", () => {
      instance.setState({ isMouseButtonLeft: false });
      instance.setColor();

      expect(paint.canvasCtx.fillStyle).toBe(paint.secondaryColor);
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

  describe("initialDraw", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ lastX: 0, lastY: 0 });
      instance.initialDraw(newX, newY);

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
