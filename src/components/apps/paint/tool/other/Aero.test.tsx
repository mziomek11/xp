import React from "react";
import { shallow } from "enzyme";

import Vector from "../../../../../classes/Vector";
import { Aero } from "./Aero";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { AeroSize } from "../../models";
import { getFillEllipsePoints } from "../../../../../utils/paint";

const paint = {
  primaryColor: "p",
  secondaryColor: "s",
  setColor: jest.fn(),
  canvasCtx: {
    fillStyle: "y",
    fillRect: jest.fn()
  },
  options: {
    aeroSize: AeroSize.Small
  }
} as any;

const createWrapper = (size: AeroSize) => {
  const ownPaint = { ...paint, options: { aeroSize: size } } as any;
  return shallow<Aero>(<Aero paint={ownPaint} />);
};

const testVector = new Vector(10, 15);
const wrapper = createWrapper(AeroSize.Small);
const instance = wrapper.instance();

describe("Paint Aero Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should updateState", () => {
      instance.setState({ mousePos: Vector.Zero });
      instance.handleMouseDown(testVector, true);

      expect(instance.state.mousePos).toBe(testVector);
      expect(instance.state.interval).not.toBe(null);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Aero>(<Aero paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(testVector, true);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with false", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Aero>(<Aero paint={paintProps} />);
      const instance = wrapper.instance();

      instance.handleMouseDown(testVector, false);
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      instance.setState({ mousePos: Vector.Zero });
      instance.handleMouseMove(testVector);

      expect(instance.state.mousePos).toBe(testVector);
    });
  });

  describe("clearInterval", () => {
    it("should updateState", () => {
      instance.setState({ interval: 10 as any });
      instance.clearInterval();

      expect(instance.state.interval).toBe(null);
    });
  });

  describe("getVectorArray", () => {
    it("should return small aero vector array", () => {
      const instance = createWrapper(AeroSize.Small).instance();
      const expectedArr = getFillEllipsePoints(2, 2);

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });

    it("should return medium aero vector array", () => {
      const instance = createWrapper(AeroSize.Medium).instance();
      const expectedArr = getFillEllipsePoints(7, 7);

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });

    it("should return big aero vector array", () => {
      const instance = createWrapper(AeroSize.Big).instance();
      const expectedArr = getFillEllipsePoints(11, 11);

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });
  });
});
