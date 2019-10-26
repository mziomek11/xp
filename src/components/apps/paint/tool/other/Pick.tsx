import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { rgbToHex, Vector } from "../../../../../utils/paint";

import pickIcon from "../../../../../assets/paint/pick.png";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  isMouseButtonLeft: boolean;
};

export class Pick extends Component<CtxProps, State> {
  readonly state: State = {
    isMouseButtonLeft: true
  };

  shouldComponentUpdate() {
    return false;
  }

  handleMouseLeftDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: true });
    this.updatePickColor(canvasPos);
  };

  handleMouseRightDown = (canvasPos: Vector) => {
    this.setState({ isMouseButtonLeft: false });
    this.updatePickColor(canvasPos);
  };

  updatePickColor = (canvasPos: Vector) => {
    const { canvasCtx, setOptions, options } = this.props.paint;
    let color: string;

    if (!this.isMouseOutsideCanvas(canvasPos)) {
      const { x, y } = canvasPos;
      const canvasPixel = canvasCtx!.getImageData(x, y, 1, 1).data;
      color = this.pixelToColor(canvasPixel);
    } else color = "#ffffff";

    if (options.pickColor !== color) setOptions({ pickColor: color });
  };

  isMouseOutsideCanvas = ({ x, y }: Vector) => {
    const { width, height } = this.props.paint.canvasCtx!.canvas;

    return x < 0 || x >= width || y < 0 || y >= height;
  };

  pixelToColor = (pixel: Uint8ClampedArray) => {
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    return rgbToHex({ r, g, b });
  };

  handleMouseUp = () => {
    const { isMouseButtonLeft } = this.state;
    const {
      setContext,
      lastSelectedTool,
      options,
      setOptions,
      primaryColor,
      secondaryColor
    } = this.props.paint;
    const newColor = options.pickColor;

    setOptions({ pickColor: "transparent" });
    setContext({
      selectedTool: lastSelectedTool,
      lastSelectedTool: "pick",
      primaryColor: isMouseButtonLeft ? newColor : primaryColor,
      secondaryColor: isMouseButtonLeft ? secondaryColor : newColor
    });
  };

  render() {
    return (
      <Tool
        icon={pickIcon}
        toolType="pick"
        data-test="tool"
        onMouseLeftDown={this.handleMouseLeftDown}
        onMouseMove={this.updatePickColor}
        onMouseUp={this.handleMouseUp}
        onMouseRightDown={this.handleMouseRightDown}
      />
    );
  }
}

export default withContext(Pick, "paint");
