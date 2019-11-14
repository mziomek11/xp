import React from "react";
import { shallow } from "enzyme";

import { View } from "./View";
import { findByTestAtrr } from "../../../../../testingUtils";
import { ZoomSize } from "../models";

type OptionalProps = {
  showColorBox: boolean;
  showToolBox: boolean;
};

let mockSetContextFn: jest.Mock;
let mockSetOptionFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    showColorBox: true,
    showToolBox: true,
    ...optProps
  };

  mockSetContextFn = jest.fn();
  mockSetOptionFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetContextFn,
      setOptions: mockSetOptionFn,
      showColorBox: optionalProps.showColorBox,
      showToolBox: optProps.showToolBox,
      options: { zoom: 1 }
    } as any
  };

  return shallow<View>(<View {...props} />);
};

const wrapper = createWrapper();

describe("Paint View MenuItem Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "view").length).toBe(1);
    });
  });

  describe("handleShowToolBoxClick", () => {
    it("should call setContext with toggled showToolBox", () => {
      let instance = createWrapper({ showToolBox: false }).instance();
      instance.handleShowToolBoxClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ showToolBox: true }]);

      instance = createWrapper({ showToolBox: true }).instance();
      instance.handleShowToolBoxClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ showToolBox: false }]);
    });
  });

  describe("handleShowColorBoxClick", () => {
    it("should call setContext with toggled showColorBox", () => {
      let instance = createWrapper({ showColorBox: false }).instance();
      instance.handleShowColorBoxClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ showColorBox: true }]);

      instance = createWrapper({ showColorBox: true }).instance();
      instance.handleShowColorBoxClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ showColorBox: false }]);
    });
  });

  describe("changeZoom", () => {
    it("should call setOptions with give zoom", () => {
      const newZoom = 12314124124;
      const instance = createWrapper().instance();
      instance.changeZoom(newZoom);

      expect(mockSetOptionFn.mock.calls.length).toBe(1);
      expect(mockSetOptionFn.mock.calls[0]).toEqual([{ zoom: newZoom }]);
    });
  });

  describe("handleNormalZoomClick", () => {
    it("should call changeZoom default zoom ", () => {
      const mockChangeZoomFn = jest.fn();
      const instance = createWrapper().instance();
      instance.changeZoom = mockChangeZoomFn;
      instance.handleNormalZoomClick();

      expect(mockChangeZoomFn.mock.calls.length).toBe(1);
      expect(mockChangeZoomFn.mock.calls[0]).toEqual([ZoomSize.Default]);
    });
  });

  describe("handleLargeZoomClick", () => {
    it("should call changeZoom big zoom ", () => {
      const mockChangeZoomFn = jest.fn();
      const instance = createWrapper().instance();
      instance.changeZoom = mockChangeZoomFn;
      instance.handleLargeZoomClick();

      expect(mockChangeZoomFn.mock.calls.length).toBe(1);
      expect(mockChangeZoomFn.mock.calls[0]).toEqual([ZoomSize.Big]);
    });
  });
});
