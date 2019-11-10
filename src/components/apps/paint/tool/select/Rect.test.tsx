import React from "react";
import { shallow } from "enzyme";

import { RectSelect } from "./Rect";
import { findByTestAtrr } from "../../../../../../testingUtils";
import Vector from "../../../../../classes/Vector";

let mockSetContextFn: jest.Mock;
let mockSetSelectOptionsFn: jest.Mock;
let mockClearTempCanvasFn: jest.Mock;
let mockPutImageDataFn: jest.Mock;
let mockGetImageDataFn: jest.Mock;
let mockSetColorFn: jest.Mock;
let mockFillRectFn: jest.Mock;

type OptionalProps = {
  isSelecting: boolean;
  isSelectTransparent: boolean;
};

const createWrapper = (opt: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    isSelecting: true,
    isSelectTransparent: false,
    ...opt
  };

  mockSetContextFn = jest.fn();
  mockSetSelectOptionsFn = jest.fn();
  mockClearTempCanvasFn = jest.fn();
  mockPutImageDataFn = jest.fn();
  mockGetImageDataFn = jest.fn();
  mockSetColorFn = jest.fn();
  mockFillRectFn = jest.fn();

  const props = {
    paint: {
      setColor: mockSetColorFn,
      clearTempCanvas: mockClearTempCanvasFn,
      setContext: mockSetContextFn,
      canvasCtx: {
        putImageData: mockPutImageDataFn,
        fillRect: mockFillRectFn
      },
      tempCanvasCtx: {
        getImageData: mockGetImageDataFn,
        putImageData: mockPutImageDataFn
      },
      setSelectOptions: mockSetSelectOptionsFn,
      options: {
        isSelectTransparent: optionalProps.isSelectTransparent,
        select: {
          isSelecting: optionalProps.isSelecting,
          position: Vector.One,
          size: Vector.One
        }
      }
    }
  } as any;

  return shallow<RectSelect>(<RectSelect {...props} />);
};

const wrapper = createWrapper();

describe("Paint RectSelect Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("handleToolChange", () => {
    it("should call setContext with proper props", () => {
      const instance = createWrapper().instance();
      instance.endSelection = jest.fn();
      instance.handleToolChange();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);
    });

    it("should call endSelection", () => {
      const mockSetSelectionFn = jest.fn();
      const instance = createWrapper({ isSelecting: true }).instance();
      instance.endSelection = mockSetSelectionFn;
      instance.handleToolChange();

      expect(mockSetSelectionFn.mock.calls.length).toBe(1);
    });

    it("should NOT call endSelection", () => {
      const mockSetSelectionFn = jest.fn();
      const instance = createWrapper({ isSelecting: false }).instance();
      instance.endSelection = mockSetSelectionFn;
      instance.handleToolChange();

      expect(mockSetSelectionFn.mock.calls.length).toBe(0);
    });
  });

  describe("handleMouseDown", () => {
    let mockEndSelectionFn: jest.Mock;

    const createMouseDownInstance = (isSelecting: boolean) => {
      const wrapper = createWrapper({ isSelecting });
      const instance = wrapper.instance();
      mockEndSelectionFn = jest.fn();
      instance.endSelection = mockEndSelectionFn;
      return instance;
    };

    it("should call end selection", () => {
      const instance = createMouseDownInstance(true);
      instance.handleMouseDown(Vector.One);

      expect(mockEndSelectionFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls.length).toBe(0);
    });

    it("should call setContext", () => {
      const instance = createMouseDownInstance(false);
      instance.handleMouseDown(Vector.One);

      expect(mockEndSelectionFn.mock.calls.length).toBe(0);
      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: true }
      ]);
    });

    it("should update state", () => {
      const instance = createMouseDownInstance(false);
      instance.setState({ startPoint: Vector.Zero });
      instance.handleMouseDown(Vector.One);

      expect(instance.state.startPoint).toEqual(Vector.One);
    });
  });

  describe("endSelection", () => {
    let mockPutImageFn: jest.Mock;
    let instance: RectSelect;

    beforeEach(() => {
      instance = createWrapper().instance();
      mockPutImageFn = jest.fn();
      instance.putImage = mockPutImageFn;
      instance.endSelection();
    });

    it("should call putImage", () => {
      expect(mockPutImageFn.mock.calls.length).toBe(1);
    });

    it("should call setSelectOptions", () => {
      expect(mockSetSelectOptionsFn.mock.calls.length).toBe(1);
      expect(mockSetSelectOptionsFn.mock.calls[0]).toEqual([
        { isSelecting: false }
      ]);
    });
  });

  describe("putImage", () => {
    const getSelectionResult = 1;
    const convertResult = 2;
    let mockGetSelectionImageFn: jest.Mock;
    let mockConvertFn: jest.Mock;

    const createPutImageInstance = (isSelectTransparent: boolean) => {
      mockGetSelectionImageFn = jest.fn(() => getSelectionResult);
      mockConvertFn = jest.fn(() => convertResult);

      const instance = createWrapper({ isSelectTransparent }).instance();
      instance.getSelectionImage = mockGetSelectionImageFn;
      instance.convertTransparencyToOriginalColor = mockConvertFn;

      return instance;
    };

    it("should call putImageData with getSelectionImage", () => {
      const instance = createPutImageInstance(false);
      instance.putImage();

      expect(mockPutImageDataFn.mock.calls.length).toBe(1);
      expect(mockPutImageDataFn.mock.calls[0][0]).toBe(getSelectionResult);
    });

    it("should call putImageData with convertTransparencyToOriginalColor", () => {
      const instance = createPutImageInstance(true);
      instance.putImage();

      expect(mockConvertFn.mock.calls.length).toBe(1);
      expect(mockConvertFn.mock.calls[0]).toEqual([getSelectionResult]);

      expect(mockPutImageDataFn.mock.calls.length).toBe(1);
      expect(mockPutImageDataFn.mock.calls[0][0]).toBe(convertResult);
    });

    it("should call putImageData with proper x and y", () => {
      const instance = createPutImageInstance(true);
      instance.putImage();

      expect(mockPutImageDataFn.mock.calls.length).toBe(1);
      const [, x, y] = mockPutImageDataFn.mock.calls[0];
      const { position } = instance.props.paint.options.select;

      expect(x).toBe(position.x);
      expect(y).toBe(position.y);
    });
  });

  describe("getSelectionImage", () => {
    it("should call getImageData with proper props", () => {
      const instance = createWrapper().instance();
      const { size } = instance.props.paint.options.select;
      instance.getSelectionImage();

      expect(mockGetImageDataFn.mock.calls.length).toBe(1);
      expect(mockGetImageDataFn.mock.calls[0]).toEqual([0, 0, size.x, size.y]);
    });
  });

  describe("handleMouseUp", () => {
    const getImageDataRes = 1;
    const selectPos = Vector.Zero;
    const selectSize = Vector.One;
    let mockGetImageDataFn: jest.Mock;
    let mockUpdateSelectOptions: jest.Mock;
    let mockFillCopiedSpace: jest.Mock;
    let mockGetSelectPositionAndSizeFn: jest.Mock;

    const createMouseUpInstance = (size: Vector = selectSize) => {
      const instance = createWrapper().instance();

      mockGetImageDataFn = jest.fn(() => getImageDataRes);
      mockUpdateSelectOptions = jest.fn();
      mockFillCopiedSpace = jest.fn();
      mockGetSelectPositionAndSizeFn = jest.fn(() => [selectPos, size]);

      instance.getImageData = mockGetImageDataFn;
      instance.updateSelectOptions = mockUpdateSelectOptions;
      instance.fillCopiedSpace = mockFillCopiedSpace;
      instance.getSelectPositionAndSize = mockGetSelectPositionAndSizeFn;

      return instance;
    };

    it("should call clearTempCanvas", () => {
      const instance = createMouseUpInstance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockClearTempCanvasFn.mock.calls.length).toBe(1);
    });

    it("should call setContext", () => {
      let instance = createMouseUpInstance(new Vector(0, 10));
      instance.handleMouseUp(Vector.Zero);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([
        { showTempCanvas: false }
      ]);

      instance = createMouseUpInstance(new Vector(15, 0));
      instance.handleMouseUp(Vector.Zero);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockGetImageDataFn.mock.calls.length).toBe(0);
    });

    it("should call getImageData with proper args", () => {
      const instance = createMouseUpInstance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockGetImageDataFn.mock.calls.length).toBe(1);
      expect(mockGetImageDataFn.mock.calls[0]).toEqual([selectPos, selectSize]);
    });

    it("should call updateSelectOptions with proper args", () => {
      const instance = createMouseUpInstance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockUpdateSelectOptions.mock.calls.length).toBe(1);
      expect(mockUpdateSelectOptions.mock.calls[0]).toEqual([
        selectPos,
        selectSize
      ]);
    });

    it("should call putImageData with proper args", () => {
      const instance = createMouseUpInstance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockPutImageDataFn.mock.calls.length).toBe(1);
      expect(mockPutImageDataFn.mock.calls[0]).toEqual([getImageDataRes, 0, 0]);
    });

    it("should call fillCopiedSpace with proper args", () => {
      const instance = createMouseUpInstance();
      instance.handleMouseUp(Vector.Zero);

      expect(mockFillCopiedSpace.mock.calls.length).toBe(1);
      expect(mockFillCopiedSpace.mock.calls[0]).toEqual([
        selectPos,
        selectSize
      ]);
    });
  });

  describe("updateSelectOptions", () => {
    it("should call setSelectOptions", () => {
      const position = new Vector(15, 16);
      const size = new Vector(30, 52);
      const instance = createWrapper().instance();
      instance.updateSelectOptions(position, size);

      expect(mockSetSelectOptionsFn.mock.calls.length).toBe(1);
      const expResult = { isSelecting: true, position, size };
      expect(mockSetSelectOptionsFn.mock.calls[0]).toEqual([expResult]);
    });
  });

  describe("fillCopiedSpace", () => {
    it("should call setColor", () => {
      const instance = createWrapper().instance();
      instance.fillCopiedSpace(Vector.Zero, Vector.Zero);

      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });

    it("should call fillRect", () => {
      const position = new Vector(30, 40);
      const size = new Vector(10, 20);

      const instance = createWrapper().instance();
      instance.fillCopiedSpace(position, size);

      expect(mockFillRectFn.mock.calls.length).toBe(1);
      const expResult = [position.x, position.y, size.x, size.y];
      expect(mockFillRectFn.mock.calls[0]).toEqual(expResult);
    });
  });
});
