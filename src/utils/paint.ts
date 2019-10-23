type Ctx = CanvasRenderingContext2D;
export type Vector = { x: number; y: number };
type RowAndDist = { row: number; distanceX: number };

export function rgbToHex(r: number, g: number, b: number): string {
  const hexR =
    r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
  const hexG =
    g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
  const hexB =
    b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);

  return "#" + hexR + hexG + hexB;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw Error("String is not hex color");
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

export function fillCircle(x: number, y: number, size: number, ctx: Ctx) {
  ctx.beginPath();
  ctx.arc(x, y, Math.floor(size / 2), 0, 2 * Math.PI);
  ctx.fill();
}

export function drawLine(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  size: number,
  ctx: Ctx
) {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

export function fillRect(x: number, y: number, size: number, ctx: Ctx) {
  ctx.fillRect(Math.floor(x - size / 2), Math.floor(y - size / 2), size, size);
}

export function fillBrushMediumCircle(x: number, y: number, ctx: Ctx) {
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

export function fillBrushBigCircle(x: number, y: number, ctx: Ctx) {
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

export function fillSpaceBeetwenPoints(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  fillFn: (x: number, y: number) => void
) {
  const [disX, disY, disMax] = calculateDistance(startX, startY, endX, endY);
  const [tickX, tickY] = calculateDistancePerTick(disX, disY, disMax);

  for (let i = 1; i < disMax; i++) {
    const drawX = Math.round(startX + i * tickX);
    const drawY = Math.round(startY + i * tickY);

    fillFn(drawX, drawY);
  }
}

export function calculateDistance(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): [number, number, number] {
  const distanceX = endX - startX;
  const distanceY = endY - startY;
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
