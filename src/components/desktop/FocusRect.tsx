import React, { Component } from "react";

import withContext from "../../hoc/withContext";
import Vector, { Corner } from "../../classes/Vector";
import desktopConfig from "./config";
import { DesktopContextType } from "ContextType";
import { areArraysEqual, getWindowPosition } from "../../utils";

type CtxProps = {
  desktop: DesktopContextType;
};

type State = {
  size: Vector;
  pos: Vector;
};

const marginAndSizeSum = desktopConfig.fileMargin + desktopConfig.fileSize;

export class FocusRect extends Component<CtxProps, State> {
  readonly state: State = {
    size: Vector.Zero,
    pos: Vector.Zero
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    window.addEventListener("touchmove", this.handleMouseMove);
    window.addEventListener("touchend", this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    window.removeEventListener("touchmove", this.handleMouseMove);
    window.removeEventListener("touchend", this.handleMouseUp);
  }

  handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const { startFocusPosition } = this.props.desktop;
    const mousePos = getWindowPosition(e);
    const size = Vector.map(Vector.sub(mousePos, startFocusPosition), Math.abs);
    const pos = Vector.getCorner(startFocusPosition, mousePos, Corner.TopLeft);
    const botRightCorn = Vector.getCorner(
      startFocusPosition,
      mousePos,
      Corner.BottomRight
    );

    this.setFocusedIds(pos, botRightCorn);
    this.setState({ size, pos });
  };

  setFocusedIds = (topLeftCorner: Vector, bottomRightCorner: Vector) => {
    const { setContext, focusedIds } = this.props.desktop;

    if (!this.isMouseXinRange(topLeftCorner, bottomRightCorner)) {
      if (focusedIds.length > 0) setContext({ focusedIds: [] });
      return;
    }

    const focused = this.getFocusedIds(topLeftCorner, bottomRightCorner);
    if (!areArraysEqual(focusedIds, focused)) {
      setContext({ focusedIds: focused });
    }
  };

  getFocusedIds = (
    topLeftCorner: Vector,
    bottomRightCorner: Vector
  ): number[] => {
    const focused: number[] = [];
    for (let i = 0; i <= 4; i++) {
      let maxY = marginAndSizeSum * (i + 1) + desktopConfig.fileMargin * i;
      let minY = desktopConfig.fileMargin * (i + 1) + marginAndSizeSum * i;

      if (topLeftCorner.y <= maxY && bottomRightCorner.y >= minY) {
        focused.push(i);
      }
    }

    return focused;
  };

  isMouseXinRange = (
    topLeftCorner: Vector,
    bottomRightCorner: Vector
  ): boolean => {
    return (
      topLeftCorner.x <= marginAndSizeSum &&
      bottomRightCorner.x >= desktopConfig.fileMargin
    );
  };

  handleMouseUp = () => {
    this.props.desktop.setContext({ focusingRect: false });
  };

  getInlineStyles = (): React.CSSProperties => {
    const { size, pos } = this.state;

    return {
      width: size.x,
      height: size.y,
      left: pos.x,
      top: pos.y
    };
  };

  render() {
    const { size } = this.state;
    const inlineStyles = this.getInlineStyles();
    if (size.x === 0 || size.y === 0) return null;
    return (
      <div
        className="desktop__focus-rect"
        style={inlineStyles}
        data-test="rect"
      />
    );
  }
}

export default withContext(FocusRect, "desktop");
