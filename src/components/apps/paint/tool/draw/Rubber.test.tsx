import React from "react";
import { shallow } from "enzyme";

import { Rubber } from "./Rubber";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";

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

const testVector: Vector = new Vector(10, 15);
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
      instance.setState({ lastPos: Vector.Zero });
      instance.handleMouseDown(testVector);

      expect(instance.state.lastPos).toBe(testVector);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn };
      const wrapper = shallow<Rubber>(<Rubber paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(testVector);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      instance.setState({ lastPos: Vector.Zero });
      instance.handleMouseMove(testVector);

      expect(instance.state.lastPos).toBe(testVector);
    });
  });
});
