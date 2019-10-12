import React from "react";

import Resizer, { OwnProps as ResizerProps } from "./Resizer";

type ResizeProps = Omit<ResizerProps, "window">;

export const createResizer = (resizeProps: ResizeProps) => {
  return () => {
    return <Resizer {...resizeProps} data-test="resizer" />;
  };
};

export const Top = createResizer({ resizesHeight: true, isTop: true });
export const TopRight = createResizer({
  resizesHeight: true,
  isTop: true,
  resizesWidth: true
});
export const TopLeft = createResizer({
  resizesHeight: true,
  isTop: true,
  resizesWidth: true,
  isLeft: true
});

export const Bottom = createResizer({ resizesHeight: true });
export const BottomRight = createResizer({
  resizesHeight: true,
  resizesWidth: true
});
export const BottomLeft = createResizer({
  resizesHeight: true,
  resizesWidth: true,
  isLeft: true
});

export const Right = createResizer({ resizesWidth: true });
export const Left = createResizer({ resizesWidth: true, isLeft: true });
