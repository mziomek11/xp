import React, { Component } from "react";

import Menu from "./menu/Menu";
import ToolBar from "./tool/Bar";
import CanvasContainer from "./canvas/Container";
import ColorBar from "./color/Bar";
import ErrorPopUp from "./subwindows/Error";
import Open from "./subwindows/Open";
import Save from "./subwindows/Save";

import withContext from "../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { areObjectsEqual } from "../../../utils";

type Props = {
  paint: PaintContextType;
};

export class Paint extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const keys = ["showError", "isOpening", "isSaving", "showColorBox"];

    return !areObjectsEqual(this.props.paint, nextProps.paint, keys);
  }

  render() {
    const { showError, isOpening, isSaving, showColorBox } = this.props.paint;
    return (
      <div className="paint" data-test="paint">
        <Menu data-test="menu" />
        <div className="paint__middle">
          <ToolBar data-test="toolbar" />
          <CanvasContainer data-test="canvas" />
        </div>
        {showColorBox && <ColorBar data-test="colorbar" />}
        {showError && <ErrorPopUp data-test="error" />}
        {isOpening && <Open data-test="open" />}
        {isSaving && <Save data-test="save" />}
      </div>
    );
  }
}

export default withContext(Paint, "paint");
