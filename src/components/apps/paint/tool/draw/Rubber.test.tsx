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
  },
  setColor: jest.fn()
} as any;

const wrapper = shallow<Rubber>(<Rubber paint={paint} />);
const instance = wrapper.instance();

describe("Paint Rubber Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      const newPoint = { x: 10, y: 15 };
      instance.setState({ lastPos: { x: 0, y: 0 } });
      instance.handleMouseDown(newPoint);

      expect(instance.state.lastPos).toBe(newPoint);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Rubber>(<Rubber paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const newPoint = { x: 10, y: 15 };
      instance.setState({ lastPos: { x: 0, y: 0 } });
      instance.handleMouseMove(newPoint);

      expect(instance.state.lastPos).toBe(newPoint);
    });
  });
});
