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

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      const newPoint = { x: 10, y: 15 };
      instance.setState({ lastPoint: { x: 0, y: 0 } });
      instance.handleMouseDown(newPoint);

      expect(instance.state.lastPoint).toEqual(newPoint);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Pencil>(<Pencil paint={paintProps} />);
      const instance = wrapper.instance();

      instance.setState({ isMouseButtonLeft: true });
      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Pencil>(<Pencil paint={paintProps} />);
      const instance = wrapper.instance();

      instance.setState({ isMouseButtonLeft: false });
      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const newPoint = { x: 10, y: 15 };
      instance.setState({ lastPoint: { x: 0, y: 0 } });
      instance.handleMouseMove(newPoint);

      expect(instance.state.lastPoint).toEqual(newPoint);
    });
  });
});
