export default class Vector {
  x: number;
  y: number;

  static Zero: Vector = new Vector(0, 0);
  static Up: Vector = new Vector(0, 1);
  static Down: Vector = new Vector(0, -1);
  static Right: Vector = new Vector(1, 0);
  static Left: Vector = new Vector(-1, 0);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static add(v1: Vector, v2: Vector) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1: Vector, v2: Vector) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static mul(v1: Vector, n: number) {
    return new Vector(v1.x * n, v1.y * n);
  }

  static div(v1: Vector, n: number) {
    if (n === 0) throw Error("Tried to divide by zero");
    return new Vector(v1.x / n, v1.y / n);
  }

  static getXYDistance(v1: Vector, v2: Vector): [number, number] {
    const width = v2.x - v1.x;
    const height = v2.y - v1.y;

    return [width, height];
  }
}
