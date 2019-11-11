import React from "react";
import { shallow } from "enzyme";

import { Container } from "./Container";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockSetContextFn: jest.Mock;
let mockFillRectFn: jest.Mock;
let mockGetImageFn: jest.Mock;
let mockPutImageFn: jest.Mock;

const createWrapper = (isRect: boolean = false) => {
  mockSetContextFn = jest.fn();
  mockFillRectFn = jest.fn();
  mockGetImageFn = jest.fn();
  mockPutImageFn = jest.fn();

  const paint = {
    setContext: mockSetContextFn,
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    selectedTool: "pencil" as any,
    options: { select: { isRect } },
    canvasCtx: {
      fillRect: mockFillRectFn,
      getImageData: mockGetImageFn,
      putImageData: mockPutImageFn,
      getContext: (x: any) => {}
    } as any
  } as any;

  return shallow<Container>(<Container paint={paint} />);
};

const wrapper = createWrapper();

describe("Paint CanvasContainer component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });

    it("should render MainCanvas component", () => {
      expect(findByTestAtrr(wrapper, "main").length).toBe(1);
    });

    it("should render TempCanvas component", () => {
      expect(findByTestAtrr(wrapper, "temp").length).toBe(1);
    });

    it("should render resizers", () => {
      const wrapper = createWrapper(false);
      const resizerRight = findByTestAtrr(wrapper, "E");
      const resizerBottom = findByTestAtrr(wrapper, "S");
      const resizerBottomRight = findByTestAtrr(wrapper, "SE");

      expect(resizerRight.length).toBe(1);
      expect(resizerRight.prop("isHorizontal")).toBe(true);
      expect(resizerRight.prop("isVertical")).toBe(false);

      expect(resizerBottom.length).toBe(1);
      expect(resizerBottom.prop("isHorizontal")).toBe(false);
      expect(resizerBottom.prop("isVertical")).toBe(true);

      expect(resizerBottomRight.length).toBe(1);
      expect(resizerBottomRight.prop("isHorizontal")).toBe(true);
      expect(resizerBottomRight.prop("isVertical")).toBe(true);
    });

    it("should NOT render resizers", () => {
      const wrapper = createWrapper(true);
      const resizerRight = findByTestAtrr(wrapper, "E");
      const resizerBottom = findByTestAtrr(wrapper, "S");
      const resizerBottomRight = findByTestAtrr(wrapper, "SE");

      expect(resizerRight.length).toBe(0);
      expect(resizerBottom.length).toBe(0);
      expect(resizerBottomRight.length).toBe(0);
    });
  });

  describe("resize", () => {
    it("should update state", () => {
      const newWidth: number = 1;
      const newHeight: number = 2;
      wrapper.instance().setState({ width: 0, height: 0 });
      wrapper.instance().resize(newWidth, newHeight);

      expect(wrapper.instance().state).toEqual({
        width: newWidth,
        height: newHeight
      });
    });

    it("should call getImageData with proper props", () => {
      const instance = createWrapper().instance();
      const stateWidth = 10;
      const stateHeight = 20;
      instance.setState({ width: stateWidth, height: stateHeight });
      instance.resize(5, 6);

      expect(mockGetImageFn.mock.calls.length).toBe(1);

      const expectedArgs = [0, 0, stateWidth, stateHeight];
      expect(mockGetImageFn.mock.calls[0]).toEqual(expectedArgs);
    });
  });

  describe("redraw", () => {
    it("should call fillRect with proper args", () => {
      const instance = createWrapper().instance();
      const newState = { width: 10, height: 20 };
      instance.setState(newState);
      instance.redraw({} as any);

      expect(mockFillRectFn.mock.calls.length).toBe(1);

      const expectedArgs = [0, 0, newState.width, newState.height];
      expect(mockFillRectFn.mock.calls[0]).toEqual(expectedArgs);
    });

    it("should call putImageData with proper args", () => {
      const instance = createWrapper().instance();
      const imageData = { example: 123 };
      instance.redraw(imageData as any);

      expect(mockPutImageFn.mock.calls.length).toBe(1);
      expect(mockPutImageFn.mock.calls[0]).toEqual([imageData, 0, 0]);
    });
  });
});
