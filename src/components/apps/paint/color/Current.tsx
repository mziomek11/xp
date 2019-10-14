import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../../../utils";

type CtxProps = {
  paint: PaintContextType;
};

export class Current extends Component<CtxProps, {}> {
  shouldComponentUpdate(nextProps: CtxProps) {
    const propsToCheck = ["primaryColor", "secondaryColor"];
    return !areObjectsEqual(this.props.paint, nextProps.paint, propsToCheck);
  }

  getRectClass = (primary: boolean) => {
    const baseClass = "paint__color__rect";
    const modifiers = { primary, secondary: !primary };
    const baseModifiers = ["current"];

    return getClassName(baseClass, modifiers, baseModifiers);
  };

  render() {
    const { primaryColor, secondaryColor } = this.props.paint;
    return (
      <div className="paint__color__current" data-test="container">
        <div
          className={this.getRectClass(false)}
          style={{ background: secondaryColor }}
          data-test="secondary"
        />
        <div
          className={this.getRectClass(true)}
          style={{ background: primaryColor }}
          data-test="primary"
        />
      </div>
    );
  }
}

export default withContext(Current, "paint");
