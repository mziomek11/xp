import React, { Component } from "react";

import Tool from "../Tool";
import Vector from "../../../../../classes/Vector";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import zoomIcon from "../../../../../assets/paint/zoom.png";
import { ZoomSize } from "../../models";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  isMouseButtonLeft: boolean;
};

export class Zoom extends Component<CtxProps, State> {
  readonly state: State = { isMouseButtonLeft: false };
  shouldComponentUpdate() {
    return false;
  }

  handleMouseDown = (_: Vector, isLeft: boolean) => {
    this.setState({ isMouseButtonLeft: isLeft });
  };

  handleMouseUp = () => {
    const { isMouseButtonLeft } = this.state;
    const { setContext, lastSelectedTool, setOptions } = this.props.paint;
    const newZoom = isMouseButtonLeft ? ZoomSize.Big : ZoomSize.Default;

    setContext({ selectedTool: lastSelectedTool, lastSelectedTool: "zoom" });
    setOptions({ zoom: newZoom });
  };

  render() {
    return (
      <Tool
        icon={zoomIcon}
        toolType="zoom"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        data-test="tool"
      />
    );
  }
}

export default withContext(Zoom, "paint");
