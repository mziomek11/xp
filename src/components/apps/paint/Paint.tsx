import React, { Component } from "react";

import Menu from "./menu/Menu";
import ToolBar from "./tool/Bar";
import Canvas from "./canvas/Canvas";
import ColorBar from "./color/Bar";
import ErrorPopUp from "./subwindows/Error";

import withContext from "../../../hoc/withContext";
import { PaintContextType } from "ContextType";

type Props = {
  paint: PaintContextType;
};

export class Paint extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.paint.showError !== nextProps.paint.showError;
  }

  render() {
    const { showError } = this.props.paint;
    return (
      <div className="paint" data-test="paint">
        <Menu data-test="menu" />
        <div className="paint__middle">
          <ToolBar data-test="toolbar" />
          <Canvas data-test="canvas" />
        </div>
        <ColorBar data-test="colorbar" />
        {showError && <ErrorPopUp data-test="error" />}
      </div>
    );
  }
}

export default withContext(Paint, "paint");
