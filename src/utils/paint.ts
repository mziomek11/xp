type Ctx = CanvasRenderingContext2D;
export type Vector = { x: number; y: number };
type RowAndDist = { row: number; distanceX: number };
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

export function fillCircle({ x, y }: Vector, size: number, ctx: Ctx) {
  ctx.beginPath();
  ctx.arc(x, y, Math.floor(size / 2), 0, 2 * Math.PI);
  ctx.fill();
}

export function drawLine(start: Vector, end: Vector, size: number, ctx: Ctx) {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function fillRect({ x, y }: Vector, size: number, ctx: Ctx) {
  ctx.fillRect(Math.floor(x - size / 2), Math.floor(y - size / 2), size, size);
}

export function fillBrushMediumCircle({ x, y }: Vector, ctx: Ctx) {
  ctx.beginPath();
  ctx.moveTo(x, y - 1); // One up
  ctx.lineTo(x + 2, y - 1); // Two right
  ctx.lineTo(x + 2, y); // One down
  ctx.lineTo(x + 3, y); // One right
  ctx.lineTo(x + 3, y + 2); // Two down
  ctx.lineTo(x + 2, y + 2); // One left
  ctx.lineTo(x + 2, y + 3); // One down
  ctx.lineTo(x, y + 3); // Two left
  ctx.lineTo(x, y + 2); // One up
  ctx.lineTo(x - 1, y + 2); // One left
  ctx.lineTo(x - 1, y); // Two up
  ctx.lineTo(x, y); // One right
  ctx.lineTo(x, y - 1); // One up
  ctx.fill();
}

export function fillBrushBigCircle({ x, y }: Vector, ctx: Ctx) {
  ctx.beginPath();
  ctx.moveTo(x - 1, y - 3); // One left, three up
  ctx.lineTo(x + 2, y - 3); // Three right
  ctx.lineTo(x + 2, y - 2); // One down
  ctx.lineTo(x + 3, y - 2); // One right
  ctx.lineTo(x + 3, y - 1); // One down
  ctx.lineTo(x + 4, y - 1); // One right
  ctx.lineTo(x + 4, y + 2); // Three down
  ctx.lineTo(x + 3, y + 2); // One left
  ctx.lineTo(x + 3, y + 3); // One down
  ctx.lineTo(x + 2, y + 3); // One left
  ctx.lineTo(x + 2, y + 4); // One down
  ctx.lineTo(x - 1, y + 4); // Three left
  ctx.lineTo(x - 1, y + 3); // One up
  ctx.lineTo(x - 2, y + 3); // One left
  ctx.lineTo(x - 2, y + 2); // One up
  ctx.lineTo(x - 3, y + 2); // One left
  ctx.lineTo(x - 3, y - 1); // Three up
  ctx.lineTo(x - 2, y - 1); // One right
  ctx.lineTo(x - 2, y - 2); // One up
  ctx.lineTo(x - 1, y - 2); // One right
  ctx.lineTo(x - 1, y - 3); // One up
  ctx.fill();
}

export function getAeroSmallVectors(): Vector[] {
  const zeroRowAndDist: number = 4;
  const posRowsAndDits: RowAndDist[] = [
    { row: 4, distanceX: 1 },
    { row: 3, distanceX: 3 },
    { row: 2, distanceX: 3 },
    { row: 1, distanceX: 4 }
  ];

  return getAeroVectorsFromPositiveAndZeroRowsAndDists(
    posRowsAndDits,
    zeroRowAndDist
  );
}

export function getAeroMediumVectors(): Vector[] {
  const zeroRowAndDist: number = 7;
  const posRowsAndDits: RowAndDist[] = [
    { row: 7, distanceX: 3 },
    { row: 6, distanceX: 5 },
    { row: 5, distanceX: 6 },
    { row: 4, distanceX: 6 },
    { row: 3, distanceX: 7 },
    { row: 2, distanceX: 7 },
    { row: 1, distanceX: 7 }
  ];

  return getAeroVectorsFromPositiveAndZeroRowsAndDists(
    posRowsAndDits,
    zeroRowAndDist
  );
}

export function getAeroBigVectors(): Vector[] {
  const zeroRowAndDist: number = 11;
  const posRowsAndDits: RowAndDist[] = [
    { row: 11, distanceX: 4 },
    { row: 10, distanceX: 6 },
    { row: 9, distanceX: 7 },
    { row: 8, distanceX: 8 },
    { row: 7, distanceX: 9 },
    { row: 6, distanceX: 10 },
    { row: 5, distanceX: 10 },
    { row: 4, distanceX: 11 },
    { row: 3, distanceX: 11 },
    { row: 2, distanceX: 11 },
    { row: 1, distanceX: 11 }
  ];

  return getAeroVectorsFromPositiveAndZeroRowsAndDists(
    posRowsAndDits,
    zeroRowAndDist
  );
}

export function getAeroVectorsFromPositiveAndZeroRowsAndDists(
  positiveRowAndDists: RowAndDist[],
  rowZeroDistance: number
) {
  const zeroRowsAndDists: RowAndDist = { row: 0, distanceX: rowZeroDistance };
  const negRowsAndDists: RowAndDist[] = positiveRowAndDists.map(reverseObjRow);
  const rowsAndDists: RowAndDist[] = [
    ...positiveRowAndDists,
    zeroRowsAndDists,
    ...negRowsAndDists
  ];

  return createAeroVectorArrayFromRowsAndDists(rowsAndDists);
}

export function reverseObjRow(obj: RowAndDist) {
  return { ...obj, row: -obj.row };
}

export function createAeroVectorArrayFromRowsAndDists(
  rowsAndDists: RowAndDist[]
): Vector[] {
  const vectors: Vector[] = [];

  rowsAndDists.forEach(({ row, distanceX }) =>
    vectors.push(...getAeroRowVector(row, distanceX))
  );

  return vectors;
}

export function getAeroRowVector(y: number, xDistance: number): Vector[] {
  const vectors = [];

  for (let x = -xDistance; x <= xDistance; x++) {
    vectors.push({ y, x });
  }

  return vectors;
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
