import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";
import { windowConfig, toolbarConfig } from "../../../config";
import { changeCursor } from "../../../utils/dom";
import { getClassName } from "../../../utils";

export type OwnProps = {
  window: WindowContextType;
  resizesWidth?: boolean;
  resizesHeight?: boolean;
  isLeft?: boolean;
  isTop?: boolean;
};

type State = {
  endX: number;
  endY: number;
  edgeDistanceX: number;
  edgeDistanceY: number;
};

export const defaultProps = {
  resizesWidth: false,
  resizesHeight: false,
  isLeft: false,
  isTop: false
};

export const initState: State = {
  endX: 0,
  endY: 0,
  edgeDistanceX: 0,
  edgeDistanceY: 0
};

export class WindowResizer extends Component<OwnProps, State> {
  readonly state: State = initState;

  static defaultProps = defaultProps;

  shouldComponentUpdate(nextProps: OwnProps) {
    const { fullscreened } = this.props.window;
    return fullscreened !== nextProps.window.fullscreened;
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.removeListeners);
  };

  removeListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.removeListeners);
    if (this.props.window.resizable) changeCursor();
    this.props.window.setContext({ resizing: false });
  };

  getOwnCursor = () => {
    const { resizesHeight, resizesWidth, isLeft, isTop } = this.props;

    let ownCursor: string = "";
    if (resizesWidth && resizesHeight) {
      if (isTop && isLeft) ownCursor = "nw-resize";
      else if (isTop && !isLeft) ownCursor = "ne-resize";
      else if (!isTop && isLeft) ownCursor = "sw-resize";
      else ownCursor = "se-resize";
    } else if (resizesWidth) {
      if (isLeft) ownCursor = "w-resize";
      else ownCursor = "e-resize";
    } else {
      if (isTop) ownCursor = "n-resize";
      else ownCursor = "s-resize";
    }

    return ownCursor;
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.window.resizable) return;
    const newState = this.calculateNewState(e.clientX, e.clientY);

    this.setState(newState);
    this.props.window.setContext({ resizing: true });
    if (this.props.window.resizable) changeCursor(this.getOwnCursor());
    this.addListeners();
  };

  calculateNewState = (clientX: number, clientY: number): State => {
    const newStateDataX = this.calculateStateDataX(clientX);
    const newStateDataY = this.calculateStateDataY(clientY);
    const newState: State = { ...newStateDataX, ...newStateDataY };

    return newState;
  };

  calculateStateDataX = (clientX: number) => {
    const { endY, edgeDistanceY, ...calculatedStateData } = this.state;
    const { window, isLeft, resizesWidth } = this.props;
    const { left, width } = window;

    if (resizesWidth) {
      if (isLeft) calculatedStateData.endX = left + width;
      calculatedStateData.edgeDistanceX = clientX - left - (isLeft ? 0 : width);
    }

    return calculatedStateData;
  };

  calculateStateDataY = (clientY: number) => {
    const { endX, edgeDistanceX, ...calculatedStateData } = this.state;
    const { window, isTop, resizesHeight } = this.props;
    const { top, height } = window;

    if (resizesHeight) {
      if (isTop) calculatedStateData.endY = top + height;
      calculatedStateData.edgeDistanceY = clientY - top - (isTop ? 0 : height);
    }

    return calculatedStateData;
  };

  handleMouseMove = (e: MouseEvent) => {
    const convertedMousePos = this.convertMousePos(e);
    const newSize = this.calculateNewSize(convertedMousePos);
    this.resize(newSize);
  };

  convertMousePos = ({ clientX, clientY }: MouseEvent) => {
    const { min, max } = Math;
    const { innerHeight } = window;

    const x = clientX;
    const y = max(0, min(clientY, innerHeight - toolbarConfig.HEIGHT));

    return { x, y };
  };

  calculateNewSize = (client: {
    x: number;
    y: number;
  }): { width: number; height: number } => {
    const newWidth: number = this.calculateNewWidth(client.x);
    const newHeight: number = this.calculateNewHeight(client.y);
    const newSize = { width: newWidth, height: newHeight };

    return newSize;
  };

  calculateNewWidth = (clientX: number): number => {
    const { isLeft, resizesWidth, window } = this.props;
    const { endX, edgeDistanceX } = this.state;
    const { width, left, maxWidth, minWidth } = window;

    let newWidth: number = width;

    if (resizesWidth) {
      if (isLeft) newWidth = endX - clientX + edgeDistanceX;
      else newWidth = clientX - left - edgeDistanceX;

      if (newWidth > maxWidth) {
        if (newWidth >= width) newWidth = width;
        else if (width < maxWidth) newWidth = maxWidth;
      }
    }

    newWidth = Math.max(newWidth, minWidth);

    return newWidth;
  };

  calculateNewHeight = (clientY: number): number => {
    const { isTop, resizesHeight, window } = this.props;
    const { edgeDistanceY, endY } = this.state;
    const { top, height, minHeight, maxHeight } = window;
    let newHeight: number = height;

    if (resizesHeight) {
      if (isTop) newHeight = endY - clientY + edgeDistanceY;
      else newHeight = clientY - top - edgeDistanceY;

      if (newHeight > maxHeight) {
        if (newHeight >= height) newHeight = height;
        else if (height < maxHeight) newHeight = maxHeight;
      }
    }

    newHeight = Math.max(newHeight, minHeight);
    return newHeight;
  };

  resize = (newSize: { width: number; height: number }): void => {
    const { isTop, isLeft, window } = this.props;
    const { top, left, setContext } = window;
    const { endX, endY } = this.state;

    if (!isLeft && !isTop) {
      setContext(newSize);
      return;
    }

    const minWidth = windowConfig.MINIMAL_WIDTH;
    const minHeight = windowConfig.MINIMAL_HEIGHT;
    const newPos: { left: number; top: number } = { left, top };

    if (isLeft) {
      newPos.left = Math.min(endX - newSize.width, endX - minWidth);
    }

    if (isTop) {
      newPos.top = Math.min(endY - newSize.height, endY - minHeight);
    }

    setContext({ ...newSize, ...newPos });
  };

  getClassModifier() {
    const { isTop, resizesWidth, resizesHeight, isLeft, window } = this.props;
    const { resizable } = window;
    const defaultClass: string = "window__resizer";

    const modifiers = {
      disabled: !resizable,
      top: (resizesHeight && isTop) as boolean,
      bottom: (resizesHeight && !isTop) as boolean,
      left: (resizesWidth && isLeft) as boolean,
      right: (resizesWidth && !isLeft) as boolean
    };

    return getClassName(defaultClass, modifiers);
  }

  render() {
    if (this.props.window.fullscreened) return null;
    return (
      <div
        className={this.getClassModifier()}
        data-test="resizer"
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

export default withContext(WindowResizer, "window");
