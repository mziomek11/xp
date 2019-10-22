import React, { Component } from "react";

import Tool from "../Tool";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import pickIcon from "../../../../../assets/paint/pick.png";
import colors from "../../colors";

type CtxProps = {
  paint: PaintContextType;
};

export class Pick extends Component<CtxProps> {
  shouldComponentUpdate() {
    return false;
  }

  updatePickColor = (x: number, y: number) => {
    const { canvasCtx, setOptions, options } = this.props.paint;
    const canvasPixel = canvasCtx!.getImageData(x, y, 1, 1).data;
    const color = this.pixelToColor(canvasPixel);

    if (options.pickColor !== color && colors.indexOf(color) > -1) {
      setOptions({ pickColor: color });
    }
  };

  pixelToColor = (pixel: Uint8ClampedArray) => {
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    return `rgb(${r},${g},${b})`;
  };

  handleMouseUp = () => {
    const {
      setContext,
      lastSelectedTool,
      options,
      setOptions
    } = this.props.paint;
    const newPrimaryColor = options.pickColor;

    setOptions({ pickColor: "transparent" });
    setContext({
      selectedTool: lastSelectedTool,
      lastSelectedTool: "pick",
      primaryColor: newPrimaryColor
    });
  };

  render() {
    return (
      <Tool
        icon={pickIcon}
        toolType="pick"
        data-test="tool"
        onMouseDown={this.updatePickColor}
        onMouseMove={this.updatePickColor}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}

export default withContext(Pick, "paint");
