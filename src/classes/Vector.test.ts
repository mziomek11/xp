import Vector, { Corner } from "./Vector";

let expetation: Vector;

describe("Vector class", () => {
  describe("add", () => {
    it("should add vectors", () => {
      expetation = Vector.add(new Vector(1, 3), new Vector(2, 5));
      expect(expetation).toEqual(new Vector(3, 8));

      expetation = Vector.add(new Vector(-1, -3), new Vector(-2, -5));
      expect(expetation).toEqual(new Vector(-3, -8));

      expetation = Vector.add(new Vector(1, 3), new Vector(-2, -5));
      expect(expetation).toEqual(new Vector(-1, -2));

      expetation = Vector.add(new Vector(-1, -3), new Vector(2, 5));
      expect(expetation).toEqual(new Vector(1, 2));
    });
  });

  describe("sub", () => {
    it("should substract vectors", () => {
      expetation = Vector.sub(new Vector(1, 3), new Vector(2, 5));
      expect(expetation).toEqual(new Vector(-1, -2));

      expetation = Vector.sub(new Vector(-1, -3), new Vector(-2, -5));
      expect(expetation).toEqual(new Vector(1, 2));

      expetation = Vector.sub(new Vector(1, 3), new Vector(-2, -5));
      expect(expetation).toEqual(new Vector(3, 8));

      expetation = Vector.sub(new Vector(-1, -3), new Vector(2, 5));
      expect(expetation).toEqual(new Vector(-3, -8));
    });
  });

  describe("mul", () => {
    it("should multiply vector", () => {
      expetation = Vector.mul(new Vector(-1, 3), 2);
      expect(expetation).toEqual(new Vector(-2, 6));

      expetation = Vector.mul(new Vector(-1, 3), -2);
      expect(expetation).toEqual(new Vector(2, -6));
    });
  });

  describe("div", () => {
    it("should divide vector", () => {
      expetation = Vector.div(new Vector(-2, 6), 2);
      expect(expetation).toEqual(new Vector(-1, 3));

      expetation = Vector.div(new Vector(-2, 6), -2);
      expect(expetation).toEqual(new Vector(1, -3));
    });

    it("should throw an error", () => {
      expect(() => Vector.div(new Vector(1, 1), 0)).toThrow();
    });
  });

  describe("getXYDistance", () => {
    it("should return distance in x and y between two vectors", () => {
      const v1 = new Vector(10, 15);
      const v2 = new Vector(15, 30);

      const result = Vector.getXYDistance(v1, v2);
      expect(result).toEqual([5, 15]);
    });
  });

  describe("getCorner", () => {
    const minX = 1;
    const maxX = 4;
    const minY = 2;
    const maxY = 5;
    const minV = new Vector(minX, minY);
    const maxV = new Vector(maxX, maxY);

    it("should return minX and minY", () => {
      const expV = new Vector(minX, minY);

      expect(Vector.getCorner(minV, maxV, Corner.TopLeft)).toEqual(expV);
    });

    it("should return maxX and minY", () => {
      const expV = new Vector(maxY, minY);

      expect(Vector.getCorner(minV, maxV, Corner.TopRight)).toEqual(expV);
    });

    it("should return minX and maxY", () => {
      const expV = new Vector(minX, maxY);

      expect(Vector.getCorner(minV, maxV, Corner.BottomLeft)).toEqual(expV);
    });

    it("should return maxX and maxY", () => {
      const expV = new Vector(maxX, maxY);

      expect(Vector.getCorner(minV, maxV, Corner.BottomRight)).toEqual(expV);
    });
  });

  describe("map", () => {
    const addOne = (x: number) => x + 1;
    const subOne = (x: number) => x - 1;

    it("should apply function to vector", () => {
      const v = new Vector(10, 11);
      const mapped = Vector.map(v, addOne);

      expect(mapped).toEqual(Vector.add(v, Vector.One));
    });

    it("should apply multiple functions to vector", () => {
      const v = new Vector(10, 11);
      const mapped = Vector.map(v, addOne, subOne);

      expect(mapped).toEqual(v);
    });
  });
});
