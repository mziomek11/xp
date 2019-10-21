type Ctx = CanvasRenderingContext2D;

export const fillCircle = (x: number, y: number, size: number, ctx: Ctx) => {
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
  ctx.fill();
};

export const drawLine = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  size: number,
  ctx: Ctx
) => {
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

export const fillRect = (x: number, y: number, size: number, ctx: Ctx) => {
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
};

export const fillBrushMediumCircle = (x: number, y: number, ctx: Ctx) => {
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
};

export const fillBrushBigCircle = (x: number, y: number, ctx: Ctx) => {
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
};

export const fillSpaceBeetwenPoints = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  fillFn: (x: number, y: number) => void
) => {
  const [disX, disY, disMax] = calculateDistance(startX, startY, endX, endY);
  const [tickX, tickY] = calculateDistancePerTick(disX, disY, disMax);

  for (let i = 1; i < disMax; i++) {
    const drawX = startX + i * tickX;
    const drawY = startY + i * tickY;

    fillFn(drawX, drawY);
  }
};

export const calculateDistance = (
  startX: number,
  startY: number,
  endX: number,
  endY: number
): [number, number, number] => {
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const biggerDistance = Math.max(Math.abs(distanceX), Math.abs(distanceY));

  return [distanceX, distanceY, biggerDistance];
};

export const calculateDistancePerTick = (
  disX: number,
  disY: number,
  maxDis: number
): [number, number] => {
  const xPerTick = disX / maxDis;
  const yPerTick = disY / maxDis;

  return [xPerTick, yPerTick];
};
