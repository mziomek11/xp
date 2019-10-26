import React from "react";
import { shallow } from "enzyme";

import { Aero } from "./Aero";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { AeroSize } from "../../models";
import { deepCopy } from "../../../../../utils";
import {
  getAeroSmallVectors,
  getAeroMediumVectors,
  getAeroBigVectors
} from "../../../../../utils/paint";

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

const wrapper = createWrapper(AeroSize.Small);
const instance = wrapper.instance();

describe("Paint Aero Tool component", () => {
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
      instance.setState({ mousePos: { x: 0, y: 0 } });
      instance.handleMouseDown(newPoint);

      expect(instance.state.mousePos).toBe(newPoint);
      expect(instance.state.interval).not.toBe(null);
    });

    it("should call setColor with true", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Aero>(<Aero paint={paintProps} />);
      const instance = wrapper.instance();

      instance.setState({ isMouseButtonLeft: true });
      instance.handleMouseDown({ x: 10, y: 10 });
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call setColor with false", () => {
      const mockSetColorFn = jest.fn();
      const paintProps = { ...paint, setColor: mockSetColorFn } as any;
      const wrapper = shallow<Aero>(<Aero paint={paintProps} />);
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
      instance.setState({ mousePos: { x: 0, y: 0 } });
      instance.handleMouseMove(newPoint);

      expect(instance.state.mousePos).toBe(newPoint);
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
      const expectedArr = deepCopy(getAeroSmallVectors());

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });

    it("should return medium aero vector array", () => {
      const instance = createWrapper(AeroSize.Medium).instance();
      const expectedArr = deepCopy(getAeroMediumVectors());

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });

    it("should return big aero vector array", () => {
      const instance = createWrapper(AeroSize.Big).instance();
      const expectedArr = deepCopy(getAeroBigVectors());

      expect(instance.getVectorArray()).toEqual(expectedArr);
    });
  });
});
