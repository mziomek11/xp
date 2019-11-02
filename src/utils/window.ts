import { MinMaxProps, StartProps } from "../components/window/Context";
import { toolbarConfig } from "../config";
import { windowConfig } from "../config";

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

export function getWindowNoResizableMinMaxProps(
  startWidth: number,
  startHeight: number
): MinMaxProps {
  return {
    minWidth: startWidth,
    maxWidth: startWidth,
    minHeight: startHeight,
    maxHeight: startHeight
  };
}
export function getWindowDefaultMinMaxProps(
  screenWidth: number,
  screenHeight: number
): MinMaxProps {
  return {
    minWidth: windowConfig.MINIMAL_WIDTH,
    maxWidth: screenWidth,
    minHeight: windowConfig.MINIMAL_HEIGHT,
    maxHeight: screenHeight - toolbarConfig.HEIGHT
  };
}

export function getWindowCustomMinMaxProps(
  startWidth: number,
  startHeight: number,
  screenWidth: number,
  screenHeight: number
) {
  return {
    minWidth: startWidth,
    maxWidth: Math.max(screenWidth, startWidth),
    minHeight: startHeight,
    maxHeight: Math.max(startHeight, screenHeight - toolbarConfig.HEIGHT)
  };
}

export function getWindowStartWidthAndHeight(
  startWidth: number,
  startHeight: number,
  { minWidth, maxWidth, minHeight, maxHeight }: MinMaxProps
): Pick<StartProps, "startHeight" | "startWidth"> {
  startWidth = Math.max(minWidth, Math.min(maxWidth, startWidth));
  startHeight = Math.max(minHeight, Math.min(maxHeight, startHeight));

  return { startWidth, startHeight };
}

export function getWindowStartLeftAndTop(
  width: number,
  height: number,
  screenWidth: number,
  screenHeight: number
): Pick<StartProps, "startLeft" | "startTop"> {
  return {
    startLeft: screenWidth / 2 - width / 2,
    startTop: screenHeight / 2 - height / 2
  };
}

export function getSubWindowStartLeftAndTop(
  width: number,
  height: number,
  parentWidth: number,
  parentHeight: number,
  parentLeft: number,
  parentTop: number,
  screenWidth: number,
  screenHeight: number
): Pick<StartProps, "startLeft" | "startTop"> {
  const { PIXELS_TO_LEAVE } = windowConfig;
  const { HEIGHT } = toolbarConfig;
  let startLeft: number = parentLeft + (parentWidth - width) / 2;
  let startTop: number = parentTop + (parentHeight - height) / 2;

  startLeft = Math.max(startLeft, -width + PIXELS_TO_LEAVE);
  startTop = Math.max(startTop, 0);

  startLeft = Math.min(startLeft, screenWidth - PIXELS_TO_LEAVE);
  startTop = Math.min(startTop, screenHeight - HEIGHT - PIXELS_TO_LEAVE);

  return { startLeft, startTop };
}
