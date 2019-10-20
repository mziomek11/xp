import React, { Component } from "react";

import Options from "./Options";
import ShapeOptions from "./Shape";
import RubberOptions from "./Rubber";
import LineOptions from "./Line";
import TransparencyOptions from "./Transparency";
import ZoomOptions from "./Zoom";
import BrushOptions from "./Brush";
import AeroOptions from "./Aero";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

type CtxProps = {
  paint: PaintContextType;
};

export class Current extends Component<CtxProps> {
  shouldComponentUpdate(nextProps: CtxProps) {
    return this.props.paint.selectedTool !== nextProps.paint.selectedTool;
  }

  render() {
    switch (this.props.paint.selectedTool) {
      case "circle":
      case "poly":
      case "rounded":
      case "rect":
        return <ShapeOptions data-test="shape" />;
      case "line":
      case "curve":
        return <LineOptions data-test="line" />;
      case "anySelect":
      case "rectSelect":
      case "text":
        return <TransparencyOptions data-test="transparency" />;
      case "rubber":
        return <RubberOptions data-test="rubber" />;
      case "zoom":
        return <ZoomOptions data-test="zoom" />;
      case "brush":
        return <BrushOptions data-test="brush" />;
      case "aero":
        return <AeroOptions data-test="aero" />;
      default:
        return <Options data-test="default" />;
    }
  }
}

export default withContext(Current, "paint");
