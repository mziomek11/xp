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
