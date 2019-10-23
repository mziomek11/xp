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

  describe("startInterval", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ mouseX: 0, mouseY: 0 });
      instance.handleMouseDown(newX, newY);

      expect(instance.state.mouseX).toBe(newX);
      expect(instance.state.mouseY).toBe(newY);
      expect(instance.state.interval).not.toBe(null);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const newX = 10;
      const newY = 15;
      instance.setState({ mouseX: 0, mouseY: 0 });
      instance.handleMouseMove(newX, newY);

      expect(instance.state.mouseX).toBe(newX);
      expect(instance.state.mouseY).toBe(newY);
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
