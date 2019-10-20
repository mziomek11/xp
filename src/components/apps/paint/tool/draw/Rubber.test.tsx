import React from "react";
import { shallow } from "enzyme";

import { Rubber } from "./Rubber";
import { findByTestAtrr } from "../../../../../../testingUtils";

const paint = {
  secondaryColor: "abc",
  canvasCtx: {
    strokeStyle: "x",
    fillStyle: "y",
    fillRect: jest.fn()
  },
  options: {
    rubberSize: 4
  }
} as any;

const wrapper = shallow<Rubber>(<Rubber paint={paint} />);
const instance = wrapper.instance();

describe("Paint Rubber Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("setColor", () => {
    it("should change stroke and fill style", () => {
      instance.setColor();

      expect(paint.canvasCtx.strokeStyle).toBe(paint.secondaryColor);
      expect(paint.canvasCtx.fillStyle).toBe(paint.secondaryColor);
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
