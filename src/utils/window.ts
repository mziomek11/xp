export function clickedWindow(
  { clientY, clientX }: MouseEvent,
  left: number,
  top: number,
  width: number,
  height: number,
  fullscreened: boolean
): boolean {
  if (fullscreened) return true;

  const isXProper = clientX >= left && clientX <= left + width;
  const isYProper = clientY >= top && clientY <= top + height;

  return isXProper && isYProper;
}
