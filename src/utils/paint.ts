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
