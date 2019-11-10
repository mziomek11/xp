import Vector from "../classes/Vector";

type Ctx = CanvasRenderingContext2D;
type RGB = { r: number; g: number; b: number };

export function rgbToHex({ r, g, b }: RGB): string {
  const isLengthEqualOne = (n: number) => n.toString(16).length === 1;
  const hexR = isLengthEqualOne(r) ? "0" + r.toString(16) : r.toString(16);
  const hexG = isLengthEqualOne(g) ? "0" + g.toString(16) : g.toString(16);
  const hexB = isLengthEqualOne(b) ? "0" + b.toString(16) : b.toString(16);

  return "#" + hexR + hexG + hexB;
}

export function hexToRgb(hex: string): RGB {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw Error("String is not hex color");
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

export function strokeEllipse(
  center: Vector,
  rx: number,
  ry: number,
  width: number,
  ctx: Ctx
) {
  const ellipsePoint = getStrokeEllipsePoints(rx, ry);

  for (let i = 0; i < ellipsePoint.length; i++) {
    const fillPoint: Vector = Vector.add(center, ellipsePoint[i]);

    fillRect(fillPoint, width, ctx);
  }
}

export function fillEllipse(center: Vector, rx: number, ry: number, ctx: Ctx) {
  const ellipsePoint = getOneSideEllipsePoints(rx, ry);

  for (let i = 0; i < ellipsePoint.length; i++) {
    const { x, y } = ellipsePoint[i];
    const startY = Math.round(center.y - y);
    const endY = Math.round(center.y + y);

    for (let j = -1; j <= 1; j += 2) {
      const drawX = Math.round(center.x - x * j) - 0.5;

      line(new Vector(drawX, startY), new Vector(drawX, endY), 1, ctx);
    }
  }
}

function getStrokeEllipsePoints(rx: number, ry: number): Vector[] {
  const oneSidePoints = getOneSideEllipsePoints(rx, ry);
  const allPoints: Vector[] = [];

  for (let i = 0; i < oneSidePoints.length; i++) {
    const { x, y } = oneSidePoints[i];

    allPoints.push(new Vector(x, -y));
    allPoints.push(new Vector(-x, y));
    allPoints.push(new Vector(x, y));
    allPoints.push(new Vector(-x, -y));
  }

  return allPoints;
}

export function getFillEllipsePoints(rx: number, ry: number): Vector[] {
  const oneSidePoints = getOneSideEllipsePoints(rx, ry);
  const allPoints: Vector[] = [];

  for (let point = 0; point < oneSidePoints.length; point++) {
    const { x, y } = oneSidePoints[point];
    const startY = Math.round(-y);
    const endY = Math.round(y);

    for (let pointY = startY; pointY <= endY; pointY++) {
      allPoints.push(new Vector(x, pointY));
      allPoints.push(new Vector(-x, pointY));
    }
  }

  return allPoints;
}

export function strokeEllpiseQuarter(
  center: Vector,
  rx: number,
  ry: number,
  width: number,
  rotateX: boolean,
  rotateY: boolean,
  ctx: Ctx
) {
  const cornerPoints = getOneSideEllipsePoints(rx, ry);

  cornerPoints.forEach(point => {
    let { x, y } = point;
    if (rotateX) x = -x;
    if (rotateY) y = -y;
    const rotatedPoint = new Vector(x, y);

    fillRect(Vector.add(center, rotatedPoint), width, ctx);
  });
}

//source http://cfetch.blogspot.com/2014/01/wap-to-draw-ellipse-using-midpoint.html
function getOneSideEllipsePoints(rx: number, ry: number): Vector[] {
  const points: Vector[] = [];
  let x = 0;
  let y = ry;
  let p = ry * ry - rx * rx * ry + (rx * rx) / 4;

  while (2 * x * ry * ry < 2 * y * rx * rx) {
    points.push(new Vector(x, y));

    if (p < 0) {
      x = x + 1;
      p = p + 2 * ry * ry * x + ry * ry;
    } else {
      x = x + 1;
      y = y - 1;
      p = p + (2 * ry * ry * x + ry * ry) - 2 * rx * rx * y;
    }
  }
  p =
    (x + 0.5) * (x + 0.5) * ry * ry +
    (y - 1) * (y - 1) * rx * rx -
    rx * rx * ry * ry;

  while (y >= 0) {
    points.push(new Vector(x, y));

    if (p > 0) {
      y = y - 1;
      p = p - 2 * rx * rx * y + rx * rx;
    } else {
      y = y - 1;
      x = x + 1;
      p = p + 2 * ry * ry * x - 2 * rx * rx * y - rx * rx;
    }
  }

  return points;
}

export function line(start: Vector, end: Vector, size: number, ctx: Ctx) {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function fillRect({ x, y }: Vector, size: number, ctx: Ctx) {
  ctx.fillRect(Math.floor(x - size / 2), Math.floor(y - size / 2), size, size);
}

export function fillSpaceBetweenPoints(
  startPoint: Vector,
  endPoint: Vector,
  fillFn: (point: Vector) => void,
  fillEgdes: boolean = false
) {
  const [disX, disY, disMax] = calculateDistance(startPoint, endPoint);
  const [tickX, tickY] = calculateDistancePerTick(disX, disY, disMax);

  for (let i = fillEgdes ? 0 : 1; i < disMax + (fillEgdes ? 1 : 0); i++) {
    const drawX: number = Math.round(startPoint.x + i * tickX);
    const drawY: number = Math.round(startPoint.y + i * tickY);
    const drawVector: Vector = { x: drawX, y: drawY };

    fillFn(drawVector);
  }
}

export function calculateDistance(
  startPoint: Vector,
  endPoint: Vector
): [number, number, number] {
  const distanceX = endPoint.x - startPoint.x;
  const distanceY = endPoint.y - startPoint.y;
  const biggerDistance = Math.max(Math.abs(distanceX), Math.abs(distanceY));

  return [distanceX, distanceY, biggerDistance];
}

export function calculateDistancePerTick(
  disX: number,
  disY: number,
  maxDis: number
): [number, number] {
  const xPerTick = disX / maxDis;
  const yPerTick = disY / maxDis;

  return [xPerTick, yPerTick];
}

//source https://pl.wikibooks.org/wiki/Kody_źródłowe/Krzywa_Béziera
export function bezier2D(controlPoints: Array<Vector>, k: number) {
  const n = controlPoints.length - 1;

  const p = (t: number): Vector => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < n + 1; i++) {
      x += controlPoints[i].x * base(n, i, t);
      y += controlPoints[i].y * base(n, i, t);
    }

    return { x: Math.round(x), y: Math.round(y) };
  };

  const dt = 1 / k;
  const points = [];
  for (let i = 0; i < k + 1; i++) {
    points.push(p(i * dt));
  }

  return points;
}

function newton(n: number, k: number): number {
  let numerator = 1;
  for (let i = n - k + 1; i < n + 1; i++) {
    numerator *= i;
  }

  let denominator = 1;
  for (let i = 1; i < k + 1; i++) {
    denominator *= i;
  }

  return numerator / denominator;
}

function base(n: number, i: number, t: number): number {
  return newton(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

export function strokeBorder(start: Vector, end: Vector, ctx: Ctx) {
  const lastWidth = ctx.lineWidth;
  const lastStroke = ctx.strokeStyle;
  const lastLineDash = ctx.getLineDash();

  ctx.setLineDash([2, 1]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineTo(start.x, end.y);
  ctx.lineTo(start.x, start.y);
  ctx.stroke();

  ctx.lineWidth = lastWidth;
  ctx.strokeStyle = lastStroke;
  ctx.setLineDash(lastLineDash);
}

export function setColorAlphaToZero(
  image: ImageData,
  color: string
): ImageData {
  const { r, g, b } = hexToRgb(color);
  const { data } = image;

  for (let i = 0; i < data.length - 4; i += 4) {
    const pixelR = data[i];
    const pixelG = data[i + 1];
    const pixelB = data[i + 2];

    if (pixelR === r && pixelG === g && pixelB === b) data[i + 3] = 0;
  }

  return image;
}
