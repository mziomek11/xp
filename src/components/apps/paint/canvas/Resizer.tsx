import React, { Component } from "react";

import ResizerRect from "./ResizerRect";
import { changeCursor } from "../../../../utils/dom";

type Props = {
  width: number;
  height: number;
  isHorizontal: boolean;
  isVertical: boolean;
  resize: (w: number, h: number) => void;
};

type State = {
  isResizing: boolean;
  startLeft: number;
  startTop: number;
  rectWidth: number;
  rectHeight: number;
};

export const minRectSize: number = 20;

class Resizer extends Component<Props, State> {
  readonly state: State = {
    isResizing: false,
    startLeft: 0,
    startTop: 0,
    rectWidth: 0,
    rectHeight: 0
  };

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height } = this.props;
    const { left, top } = e.currentTarget.getClientRects()[0];

    changeCursor(this.getOwnCursor());
    this.setState({
      isResizing: true,
      startLeft: left,
      startTop: top,
      rectWidth: width,
      rectHeight: height
    });

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  getOwnCursor = () => {
    const { isHorizontal, isVertical } = this.props;

    if (isHorizontal && isVertical) return "se-resize";
    else if (isHorizontal) return "e-resize";
    else if (isVertical) return "s-resize";
    else throw Error("Wrong resizer position");
  };

  handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const { isHorizontal, isVertical, width, height } = this.props;
    const { startLeft, startTop } = this.state;

    let newState: Partial<State> = {};

    if (isHorizontal) {
      newState.rectWidth = Math.max(clientX - startLeft + width, minRectSize);
    }
    if (isVertical) {
      newState.rectHeight = Math.max(clientY - startTop + height, minRectSize);
    }

    this.setState(newState as State);
  };

  handleMouseUp = () => {
    changeCursor();
    this.removeListeners();
    this.setState({ isResizing: false });
    this.props.resize(this.state.rectWidth, this.state.rectHeight);
  };

  getInlineStyles = () => {
    const additionalGap = 3;
    const { width, height, isHorizontal, isVertical } = this.props;

    return {
      left: (width + additionalGap) / (isHorizontal ? 1 : 2),
      top: (height + additionalGap) / (isVertical ? 1 : 2),
      cursor: this.getOwnCursor()
    };
  };

  render() {
    const { isResizing, rectWidth, rectHeight } = this.state;
    const inlineStyles = this.getInlineStyles();

    return (
      <>
        <div
          className="paint__canvas__resizer"
          onMouseDown={this.handleMouseDown}
          style={inlineStyles}
          data-test="resizer"
        />
        {isResizing && (
          <ResizerRect width={rectWidth} height={rectHeight} data-test="rect" />
        )}
      </>
    );
  }
}

export default Resizer;
