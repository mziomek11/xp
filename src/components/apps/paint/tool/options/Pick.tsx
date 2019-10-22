import React, { Component } from "react";

import Options from "./Options";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

type CtxProps = {
  paint: PaintContextType;
};

export class PickOptions extends Component<CtxProps> {
  shouldComponentUpdate(nextProps: CtxProps) {
    const { pickColor } = this.props.paint.options;

    return pickColor !== nextProps.paint.options.pickColor;
  }

  render() {
    const color = this.props.paint.options.pickColor;
    return <Options style={{ backgroundColor: color }} data-test="options" />;
  }
}

export default withContext(PickOptions, "paint");
