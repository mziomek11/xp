import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import textIcon from "../../../../../assets/paint/text.png";
import { strokeBorder, getSelectPosAndSize } from "../../../../../utils/paint";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  startPoint: Vector;
};

export class Text extends Component<CtxProps, State> {
  readonly state: State = {
    startPoint: Vector.Zero
  };

  shouldComponentUpdate() {
    return false;
  }

  handleToolChange = () => {
    const { setContext, setSelectOptions, options } = this.props.paint;
    setContext({ showTempCanvas: false });
    if (options.select.isText) setSelectOptions({ isText: false });
  };

  handleMouseDown = (canvasPos: Vector) => {
    const { setContext, options, setSelectOptions } = this.props.paint;

    if (options.select.isText) setSelectOptions({ isText: false });

    setContext({ showTempCanvas: true });
    this.setState({ startPoint: canvasPos });
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { clearTempCanvas, tempCanvasCtx } = this.props.paint;
    const { startPoint } = this.state;

    clearTempCanvas();
    strokeBorder(startPoint, canvasPos, tempCanvasCtx!);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const {
      canvasCtx,
      setContext,
      setSelectOptions,
      options,
      clearTempCanvas
    } = this.props.paint;
    const { isText } = options.select;
    const { startPoint } = this.state;

    if (isText) {
      setSelectOptions({ isText: false });
      return;
    }

    clearTempCanvas();
    const [pos, size] = getSelectPosAndSize(startPoint, canvasPos, canvasCtx!);
    setContext({ showTempCanvas: false });

    if (size.x === 0 || size.y === 0) return;

    setSelectOptions({ isText: true, size, position: pos });
  };

  render() {
    return (
      <Tool
        icon={textIcon}
        toolType="text"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onToolChange={this.handleToolChange}
        data-test="tool"
      />
    );
  }
}

export default withContext(Text, "paint");
