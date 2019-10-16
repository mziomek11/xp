import { fillCircle, drawLine } from "./paint";

let mockBeginPathFn: jest.Mock;
let mockArcFn: jest.Mock;
let mockFillFn: jest.Mock;
let mockMoveToFn: jest.Mock;
let mockLineToFn: jest.Mock;
let mockStrokeFn: jest.Mock;

const createCanvasContext = () => {
  mockBeginPathFn = jest.fn();
  mockArcFn = jest.fn();
  mockFillFn = jest.fn();
  mockMoveToFn = jest.fn();
  mockLineToFn = jest.fn();
  mockStrokeFn = jest.fn();

  return {
    beginPath: mockBeginPathFn,
    arc: mockArcFn,
    fill: mockFillFn,
    moveTo: mockMoveToFn,
    lineTo: mockLineToFn,
    stroke: mockStrokeFn
  };
};

let canvasContext = createCanvasContext();

describe("Paint utils functions", () => {
  beforeEach(() => {
    canvasContext = createCanvasContext();
  });

  describe("fillCircle", () => {
    it("should call beginPath, and fill once", () => {
      fillCircle(1, 1, 1, canvasContext as any);

      expect(mockBeginPathFn.mock.calls.length).toBe(1);
      expect(mockFillFn.mock.calls.length).toBe(1);
    });

    it("should call arc with proper args", () => {
      const x = 10;
      const y = 20;
      const size = 10;
      fillCircle(x, y, size, canvasContext as any);

      expect(mockArcFn.mock.calls.length).toBe(1);
      expect(mockArcFn.mock.calls[0]).toEqual([x, y, 5, 0, 2 * Math.PI]);
    });
  });

  describe("drawLine", () => {
    it("should call begin path and stroke once", () => {
      drawLine(1, 1, 2, 2, 4, canvasContext as any);

      expect(mockBeginPathFn.mock.calls.length).toBe(1);
      expect(mockStrokeFn.mock.calls.length).toBe(1);
    });

    it("should call moveTo with startX and startY", () => {
      const startX = 10;
      const startY = 20;
      drawLine(startX, startY, 2, 2, 4, canvasContext as any);

      expect(mockMoveToFn.mock.calls.length).toBe(1);
      expect(mockMoveToFn.mock.calls[0]).toEqual([startX, startY]);
    });

    it("should call lineTo with endX and endY", () => {
      const endX = 40;
      const endY = 50;
      drawLine(1, 2, endX, endY, 4, canvasContext as any);

      expect(mockLineToFn.mock.calls.length).toBe(1);
      expect(mockLineToFn.mock.calls[0]).toEqual([endX, endY]);
    });
  });
});
