import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import rectShapeIcon from "../../../../../assets/paint/rectshape.png";
import {
  strokeBorder,
  setColorAlphaToZero,
  getSelectPosAndSize,
  convertTransparencyToOriginalColor
} from "../../../../../utils/paint";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  startPoint: Vector;
};

export class RectSelect extends Component<CtxProps, State> {
  readonly state: State = {
    startPoint: Vector.Zero
  };

  shouldComponentUpdate() {
    return false;
  }

  handleToolChange = () => {
    const { setContext } = this.props.paint;
    setContext({ showTempCanvas: false });
    if (this.props.paint.options.select.isRect) this.endSelection();
  };

  handleMouseDown = (canvasPos: Vector) => {
    const { setContext, options } = this.props.paint;

    if (options.select.isRect) this.endSelection();
    else setContext({ showTempCanvas: true });

    this.setState({ startPoint: canvasPos });
  };

  endSelection = () => {
    const { setSelectOptions } = this.props.paint;

    this.putImage();
    setSelectOptions({ isRect: false });
  };

  putImage = () => {
    const { canvasCtx, options } = this.props.paint;
    const { position, size, isTransparent } = options.select;

    let image = this.getSelectionImage();
    if (isTransparent) {
      image = convertTransparencyToOriginalColor(
        image,
        canvasCtx!,
        position,
        size
      );
    }

    canvasCtx!.putImageData(image, position.x, position.y);
  };

  getSelectionImage = (): ImageData => {
    const { tempCanvasCtx, options } = this.props.paint;
    const { x, y } = options.select.size;
    const image = tempCanvasCtx!.getImageData(0, 0, x, y);

    return image;
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { clearTempCanvas, tempCanvasCtx } = this.props.paint;
    const { startPoint } = this.state;

    clearTempCanvas();
    strokeBorder(startPoint, canvasPos, tempCanvasCtx!);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const { startPoint } = this.state;
    const {
      clearTempCanvas,
      tempCanvasCtx,
      setContext,
      canvasCtx
    } = this.props.paint;

    clearTempCanvas();
    const [pos, size] = getSelectPosAndSize(startPoint, canvasPos, canvasCtx!);
    if (size.x === 0 || size.y === 0) {
      setContext({ showTempCanvas: false });
      return;
    }

    const image = this.getImageData(pos, size);

    this.updateSelectOptions(pos, size);
    tempCanvasCtx!.putImageData(image, 0, 0);
    this.fillCopiedSpace(pos, size);
  };

  getImageData = (pos: Vector, size: Vector): ImageData => {
    const { canvasCtx, options, secondaryColor } = this.props.paint;
    const image = canvasCtx!.getImageData(pos.x, pos.y, size.x, size.y);

    if (!options.select.isTransparent) return image;
    return setColorAlphaToZero(image, secondaryColor);
  };

  updateSelectOptions = (pos: Vector, size: Vector) => {
    this.props.paint.setSelectOptions({
      isRect: true,
      position: pos,
      size: size
    });
  };

  fillCopiedSpace = (position: Vector, size: Vector) => {
    const { canvasCtx, setColor } = this.props.paint;

    setColor(false);
    canvasCtx!.fillRect(position.x, position.y, size.x, size.y);
  };

  render() {
    return (
      <Tool
        icon={rectShapeIcon}
        toolType="rectSelect"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onToolChange={this.handleToolChange}
        data-test="tool"
      />
    );
  }
}

export default withContext(RectSelect, "paint");
