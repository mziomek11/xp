import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

type OwnProps = {
  hex: string;
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

export class Rect extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  handleLeftClick = () => {
    const { paint, hex } = this.props;
    paint.setContext({ primaryColor: hex });
  };

  handleRightClick = (e: any) => {
    e.preventDefault();

    const { paint, hex } = this.props;
    paint.setContext({ secondaryColor: hex });
  };

  render() {
    return (
      <li
        className="paint__color__rect"
        onClick={this.handleLeftClick}
        style={{ background: this.props.hex }}
        onContextMenu={this.handleRightClick}
        data-test="rect"
      />
    );
  }
}

export default withContext(Rect, "paint");
