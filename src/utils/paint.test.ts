import {
  line,
  fillRect,
  fillSpaceBetweenPoints,
  calculateDistance,
  calculateDistancePerTick,
  hexToRgb,
  rgbToHex,
  setColorAlphaToZero
} from "./paint";

let mockBeginPathFn: jest.Mock;
let mockArcFn: jest.Mock;
let mockFillFn: jest.Mock;
let mockMoveToFn: jest.Mock;
let mockLineToFn: jest.Mock;
let mockStrokeFn: jest.Mock;
let mockFillRectFn: jest.Mock;

const createCanvasContext = () => {
  mockBeginPathFn = jest.fn();
  mockArcFn = jest.fn();
  mockFillFn = jest.fn();
  mockMoveToFn = jest.fn();
  mockLineToFn = jest.fn();
  mockStrokeFn = jest.fn();
  mockFillRectFn = jest.fn();

  return {
    beginPath: mockBeginPathFn,
    arc: mockArcFn,
    fill: mockFillFn,
    moveTo: mockMoveToFn,
    lineTo: mockLineToFn,
    stroke: mockStrokeFn,
    fillRect: mockFillRectFn
  };
};

let canvasContext: any = createCanvasContext();

describe("Paint utils functions", () => {
  beforeEach(() => {
    canvasContext = createCanvasContext();
  });

  describe("rgbToHex", () => {
    it("should convert properly", () => {
      expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
      expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe("#0000ff");
      expect(rgbToHex({ r: 15, g: 155, b: 214 })).toBe("#0f9bd6");
    });
  });

  describe("hexToRgb", () => {
    it("should convert properly", () => {
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb("#0f9bd6")).toEqual({ r: 15, g: 155, b: 214 });
    });

    it("should throw an error", () => {
      expect(() => hexToRgb("papap")).toThrow();
    });
  });

  describe("line", () => {
    it("should call begin path and stroke once", () => {
      line({ x: 1, y: 1 }, { x: 2, y: 2 }, 4, canvasContext);

      expect(mockBeginPathFn.mock.calls.length).toBe(1);
      expect(mockStrokeFn.mock.calls.length).toBe(1);
    });

    it("should call moveTo with startX and startY", () => {
      const startX = 10;
      const startY = 20;
      line({ x: startX, y: startY }, { x: 2, y: 2 }, 4, canvasContext);

      expect(mockMoveToFn.mock.calls.length).toBe(1);
      expect(mockMoveToFn.mock.calls[0]).toEqual([startX, startY]);
    });

    it("should call lineTo with endX and endY", () => {
      const endX = 40;
      const endY = 50;
      line({ x: 1, y: 2 }, { x: endX, y: endY }, 4, canvasContext);

      expect(mockLineToFn.mock.calls.length).toBe(1);
      expect(mockLineToFn.mock.calls[0]).toEqual([endX, endY]);
    });
  });

  describe("fillRect", () => {
    it("should call fillRect with centered args", () => {
      const x = 10;
      const y = 10;
      const size = 10;

      fillRect({ x, y }, size, canvasContext);

      expect(mockFillRectFn.mock.calls.length).toBe(1);
      expect(mockFillRectFn.mock.calls[0]).toEqual([5, 5, 10, 10]);
    });
  });

  describe("calculateDistance", () => {
    it("should return proper distances", () => {
      const [dX1, dY1, dM1] = calculateDistance(
        { x: 1, y: 1 },
        { x: 10, y: 20 }
      );
      expect(dX1).toBe(9);
      expect(dY1).toBe(19);
      expect(dM1).toBe(19);

      const [dX2, dY2, dM2] = calculateDistance(
        { x: -1, y: -1 },
        { x: -10, y: -15 }
      );
      expect(dX2).toBe(-9);
      expect(dY2).toBe(-14);
      expect(dM2).toBe(14);

      const [dX3, dY3, dM3] = calculateDistance(
        { x: -1, y: -1 },
        { x: 10, y: 20 }
      );
      expect(dX3).toBe(11);
      expect(dY3).toBe(21);
      expect(dM3).toBe(21);

      const [dX4, dY4, dM4] = calculateDistance(
        { x: 1, y: 1 },
        { x: -20, y: -10 }
      );
      expect(dX4).toBe(-21);
      expect(dY4).toBe(-11);
      expect(dM4).toBe(21);
    });
  });

  describe("calculateDistancePerTick", () => {
    it("should return proper distances", () => {
      const [tickX, tickY] = calculateDistancePerTick(10, 20, 20);

      expect(tickX).toBe(0.5);
      expect(tickY).toBe(1);
    });
  });

  describe("fillSpaceBetweenPoints", () => {
    const startPos = { x: -1, y: -2 };
    const endPos = { x: 3, y: 2 };

    it("should call mock three times with proper args", () => {
      const mockFillFn = jest.fn();

      fillSpaceBetweenPoints(startPos, endPos, mockFillFn);
      expect(mockFillFn.mock.calls.length).toBe(3);

      const [call1, call2, call3] = mockFillFn.mock.calls;
      expect(call1).toEqual([{ x: 0, y: -1 }]);
      expect(call2).toEqual([{ x: 1, y: 0 }]);
      expect(call3).toEqual([{ x: 2, y: 1 }]);
    });

    it("should call mock five times when withEgdes is true", () => {
      const mockFillFn = jest.fn();

      fillSpaceBetweenPoints(startPos, endPos, mockFillFn, true);
      expect(mockFillFn.mock.calls.length).toBe(5);

      const [call1, call2, call3, call4, call5] = mockFillFn.mock.calls;
      expect(call1).toEqual([startPos]);
      expect(call2).toEqual([{ x: 0, y: -1 }]);
      expect(call3).toEqual([{ x: 1, y: 0 }]);
      expect(call4).toEqual([{ x: 2, y: 1 }]);
      expect(call5).toEqual([endPos]);
    });
  });

  describe("setColorAlphaToZero", () => {
    it("should return updated image", () => {
      const img = {
        data: [255, 255, 255, 255, 255, 255, 254, 255]
      } as any;
      const updatedImage = setColorAlphaToZero(img, "#ffffff");
      expect(updatedImage.data).toEqual([255, 255, 255, 0, 255, 255, 254, 255]);
    });
  });
});
