import React, { Component } from "react";

import withWindowContext from "../../../hoc/withWindowContext";
import { WindowContextType } from "ContextType";
import { windowConfig, toolbarConfig } from "../../../config";

export type OwnProps = {
  context: WindowContextType;
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
    const { fullscreened } = this.props.context;
    return fullscreened !== nextProps.context.fullscreened;
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
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const newState = this.calculateNewState(e.clientX, e.clientY);

    this.setState(newState);
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
    const { context, isLeft, resizesWidth } = this.props;
    const { left, width } = context;

    if (resizesWidth) {
      if (isLeft) calculatedStateData.endX = left + width;
      calculatedStateData.edgeDistanceX = clientX - left - (isLeft ? 0 : width);
    }

    return calculatedStateData;
  };

  calculateStateDataY = (clientY: number) => {
    const { endX, edgeDistanceX, ...calculatedStateData } = this.state;
    const { context, isTop, resizesHeight } = this.props;
    const { top, height } = context;

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
    const { isLeft, resizesWidth, context } = this.props;
    const { endX, edgeDistanceX } = this.state;
    const { width, left } = context;

    let newWidth: number = width;

    if (resizesWidth) {
      if (isLeft) newWidth = endX - clientX + edgeDistanceX;
      else newWidth = clientX - left - edgeDistanceX;

      newWidth = Math.min(window.innerWidth, newWidth);
    }

    newWidth = Math.max(newWidth, windowConfig.MINIMAL_WIDTH);
    return newWidth;
  };

  calculateNewHeight = (clientY: number): number => {
    const { isTop, resizesHeight, context } = this.props;
    const { edgeDistanceY, endY } = this.state;
    const { top, height } = context;
    const { innerHeight } = window;

    let newHeight: number = height;

    if (resizesHeight) {
      if (isTop) newHeight = endY - clientY + edgeDistanceY;
      else newHeight = clientY - top - edgeDistanceY;

      newHeight = Math.min(innerHeight - toolbarConfig.HEIGHT, newHeight);
    }

    newHeight = Math.max(newHeight, windowConfig.MINIMAL_HEIGHT);

    return newHeight;
  };

  resize = (newSize: { width: number; height: number }): void => {
    const { isTop, isLeft, context } = this.props;
    const { top, left, setContext } = context;
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
    const { isTop, resizesWidth, resizesHeight, isLeft } = this.props;
    const defaultClass: string = "window__resizer";
    let newClass: string = defaultClass;

    if (resizesHeight)
      newClass += ` ${defaultClass}--${isTop ? "top" : "bottom"}`;

    if (resizesWidth)
      newClass += ` ${defaultClass}--${isLeft ? "left" : "right"}`;

    return newClass;
  }

  render() {
    if (this.props.context.fullscreened) return null;
    return (
      <div
        className={this.getClassModifier()}
        data-test="resizer"
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

export default withWindowContext(WindowResizer);
