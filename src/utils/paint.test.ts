import {
  fillCircle,
  drawLine,
  fillRect,
  fillSpaceBeetwenPoints,
  calculateDistance,
  calculateDistancePerTick
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

  describe("fillCircle", () => {
    it("should call beginPath, and fill once", () => {
      fillCircle(1, 1, 1, canvasContext);

      expect(mockBeginPathFn.mock.calls.length).toBe(1);
      expect(mockFillFn.mock.calls.length).toBe(1);
    });

    it("should call arc with proper args", () => {
      const x = 10;
      const y = 20;
      const size = 10;
      fillCircle(x, y, size, canvasContext);

      expect(mockArcFn.mock.calls.length).toBe(1);
      expect(mockArcFn.mock.calls[0]).toEqual([x, y, 5, 0, 2 * Math.PI]);
    });
  });

  describe("drawLine", () => {
    it("should call begin path and stroke once", () => {
      drawLine(1, 1, 2, 2, 4, canvasContext);

      expect(mockBeginPathFn.mock.calls.length).toBe(1);
      expect(mockStrokeFn.mock.calls.length).toBe(1);
    });

    it("should call moveTo with startX and startY", () => {
      const startX = 10;
      const startY = 20;
      drawLine(startX, startY, 2, 2, 4, canvasContext);

      expect(mockMoveToFn.mock.calls.length).toBe(1);
      expect(mockMoveToFn.mock.calls[0]).toEqual([startX, startY]);
    });

    it("should call lineTo with endX and endY", () => {
      const endX = 40;
      const endY = 50;
      drawLine(1, 2, endX, endY, 4, canvasContext);

      expect(mockLineToFn.mock.calls.length).toBe(1);
      expect(mockLineToFn.mock.calls[0]).toEqual([endX, endY]);
    });
  });

  describe("fillRect", () => {
    it("should call fillRect with centered args", () => {
      const x = 10;
      const y = 10;
      const size = 10;

      fillRect(x, y, size, canvasContext);

      expect(mockFillRectFn.mock.calls.length).toBe(1);
      expect(mockFillRectFn.mock.calls[0]).toEqual([5, 5, 10, 10]);
    });
  });

  describe("calculateDistance", () => {
    it("should return proper distances", () => {
      const [dX1, dY1, dM1] = calculateDistance(1, 1, 10, 20);
      expect(dX1).toBe(9);
      expect(dY1).toBe(19);
      expect(dM1).toBe(19);

      const [dX2, dY2, dM2] = calculateDistance(-1, -1, -10, -15);
      expect(dX2).toBe(-9);
      expect(dY2).toBe(-14);
      expect(dM2).toBe(14);

      const [dX3, dY3, dM3] = calculateDistance(-1, -1, 10, 20);
      expect(dX3).toBe(11);
      expect(dY3).toBe(21);
      expect(dM3).toBe(21);

      const [dX4, dY4, dM4] = calculateDistance(1, 1, -20, -10);
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

  describe("fillSpaceBeetwenPoints", () => {
    it("should call mock three times with proper args", () => {
      const mockFillFn = jest.fn();
      const startX = -1;
      const startY = -2;
      const endX = 3;
      const endY = 2;

      fillSpaceBeetwenPoints(startX, startY, endX, endY, mockFillFn);
      expect(mockFillFn.mock.calls.length).toBe(3);

      const [call1, call2, call3] = mockFillFn.mock.calls;
      expect(call1).toEqual([0, -1]);
      expect(call2).toEqual([1, 0]);
      expect(call3).toEqual([2, 1]);
    });
  });
});
