import React from "react";
import { shallow } from "enzyme";

import { MainCanvas } from "./Main";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  width: number;
  height: number;
  zoom: number;
  startImage: any;
};

let mockPutImageDataFn: jest.Mock;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    width: 10,
    height: 10,
    zoom: 1,
    startImage: undefined,
    ...optProps
  };
  mockPutImageDataFn = jest.fn();
  const props = {
    width: optionalProps.width,
    height: optionalProps.height,
    paint: {
      startImage: optionalProps.startImage,
      setContext: jest.fn(),
      options: { zoom: optionalProps.zoom },
      canvasCtx: { putImageData: mockPutImageDataFn }
    }
  } as any;

  return shallow<MainCanvas>(<MainCanvas {...props} />);
};

const wrapper = createWrapper();

describe("Paint MainCanvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });

  describe("componentDidUpdate", () => {
    it("should call putImageData once", () => {
      const instance = createWrapper({ startImage: "a" }).instance();
      instance.componentDidUpdate();
      instance.componentDidUpdate();
      instance.componentDidUpdate();

      expect(mockPutImageDataFn.mock.calls.length).toBe(1);
    });

    it("should NOT call putImageData", () => {
      const instance = createWrapper().instance();
      instance.componentDidUpdate();
      instance.componentDidUpdate();
      instance.componentDidUpdate();

      expect(mockPutImageDataFn.mock.calls.length).toBe(0);
    });
  });

  describe("initialFill", () => {
    it("should call fillRect with width and height from props", () => {
      const width = 150;
      const height = 100;
      const instance = createWrapper({ width, height }).instance();
      const mockFillFn = jest.fn();
      instance.initialFill({ fillRect: mockFillFn } as any);

      expect(mockFillFn.mock.calls.length).toBe(1);
      expect(mockFillFn.mock.calls[0]).toEqual([0, 0, width, height]);
    });
  });

  describe("getInlineStyles", () => {
    it("should return with and height", () => {
      const width = 50;
      const height = 40;
      const instance = createWrapper({ width, height }).instance();
      const styles = instance.getInlineStyles();

      expect(styles).toEqual({ width, height });
    });

    it("should return zoomed width and height", () => {
      const width = 50;
      const height = 40;
      const zoom = 2;
      const instance = createWrapper({ width, height, zoom }).instance();
      const styles = instance.getInlineStyles();

      expect(styles).toEqual({ width: width * zoom, height: height * zoom });
    });
  });
});
