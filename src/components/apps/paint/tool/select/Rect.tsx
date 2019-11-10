import React, { Component } from "react";

import Tool from "../Tool";
import Vector, { Corner } from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import rectShapeIcon from "../../../../../assets/paint/rectshape.png";
import { strokeBorder, setColorAlphaToZero } from "../../../../../utils/paint";

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
    if (this.props.paint.options.select.isSelecting) this.endSelection();
  };

  handleMouseDown = (canvasPos: Vector) => {
    const { setContext, options } = this.props.paint;

    if (options.select.isSelecting) this.endSelection();
    else setContext({ showTempCanvas: true });

    this.setState({ startPoint: canvasPos });
  };

  endSelection = () => {
    const { setSelectOptions } = this.props.paint;

    this.putImage();
    setSelectOptions({ isSelecting: false });
  };

  putImage = () => {
    const { canvasCtx, options } = this.props.paint;
    const { isSelectTransparent, select } = options;
    const { x, y } = select.position;

    let image = this.getSelectionImage();
    if (isSelectTransparent) {
      image = this.convertTransparencyToOriginalColor(image);
    }

    canvasCtx!.putImageData(image, x, y);
  };

  getSelectionImage = (): ImageData => {
    const { tempCanvasCtx, options } = this.props.paint;
    const { x, y } = options.select.size;
    const image = tempCanvasCtx!.getImageData(0, 0, x, y);

    return image;
  };

  convertTransparencyToOriginalColor = (image: ImageData) => {
    const { canvasCtx, options } = this.props.paint;
    const { position, size } = options.select;
    const { width, height } = canvasCtx!.canvas;
    const { data } = image;
    const orginalData = canvasCtx!.getImageData(0, 0, width, height).data;

    for (let i = 0; i < data.length - 4; i += 4) {
      const pixelAlpha = data[i + 3];

      if (pixelAlpha === 0) {
        const row = Math.floor(i / 4 / size.x);
        const col = (i / 4) % size.x;
        const originalRow = position.y + row;
        const originalCol = position.x + col;

        const originalPixelIndex = (originalRow * width + originalCol) * 4;
        const originalR = orginalData[originalPixelIndex];
        const originalG = orginalData[originalPixelIndex + 1];
        const originalB = orginalData[originalPixelIndex + 2];
        const originalA = orginalData[originalPixelIndex + 3];

        data[i] = originalR;
        data[i + 1] = originalG;
        data[i + 2] = originalB;
        data[i + 3] = originalA;
      }
    }

    return image;
  };

  handleMouseMove = (canvasPos: Vector) => {
    const { clearTempCanvas, tempCanvasCtx } = this.props.paint;
    const { startPoint } = this.state;

    clearTempCanvas();
    strokeBorder(startPoint, canvasPos, tempCanvasCtx!);
  };

  handleMouseUp = (canvasPos: Vector) => {
    const { clearTempCanvas, tempCanvasCtx, setContext } = this.props.paint;

    clearTempCanvas();
    const [pos, size] = this.getSelectPositionAndSize(canvasPos);
    if (size.x === 0 || size.y === 0) {
      setContext({ showTempCanvas: false });
      return;
    }

    const image = this.getImageData(pos, size);

    this.updateSelectOptions(pos, size);
    tempCanvasCtx!.putImageData(image, 0, 0);
    this.fillCopiedSpace(pos, size);
  };

  getSelectPositionAndSize = (secondPoint: Vector): [Vector, Vector] => {
    const { width, height } = this.props.paint.canvasCtx!.canvas;
    const { BottomRight, TopLeft } = Corner;
    const { startPoint } = this.state;
    const { max, min } = Math;

    const NWCorner = Vector.getCorner(startPoint, secondPoint, TopLeft);
    const SECorner = Vector.getCorner(startPoint, secondPoint, BottomRight);

    const position = new Vector(max(NWCorner.x, 0), max(NWCorner.y, 0));
    const maxWidth = width - position.x;
    const maxHeight = height - position.y;

    const size = Vector.sub(SECorner, position);
    const adjSize = new Vector(min(size.x, maxWidth), min(size.y, maxHeight));

    return [position, adjSize];
  };

  getImageData = (pos: Vector, size: Vector): ImageData => {
    const { canvasCtx, options, secondaryColor } = this.props.paint;
    const image = canvasCtx!.getImageData(pos.x, pos.y, size.x, size.y);

    if (!options.isSelectTransparent) return image;
    return setColorAlphaToZero(image, secondaryColor);
  };

  updateSelectOptions = (pos: Vector, size: Vector) => {
    this.props.paint.setSelectOptions({
      isSelecting: true,
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
