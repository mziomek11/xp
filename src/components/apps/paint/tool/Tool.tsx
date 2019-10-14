import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { getClassName } from "../../../../utils";
import { Tool as ToolType } from "../models";
import { PaintContextType } from "ContextType";

type OwnProps = {
  icon: string;
  toolType: ToolType;
};

type CtxProps = {
  paint: PaintContextType;
};

type Props = OwnProps & CtxProps;

export class Tool extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.paint.selectedTool !== nextProps.paint.selectedTool;
  }

  handleClick = () => {
    this.props.paint.setContext({ selectedTool: this.props.toolType });
  };

  getClassName = () => {
    const { paint, toolType } = this.props;
    const baseClass = "paint__toolbar__tool";
    const modifiers = { selected: toolType === paint.selectedTool };

    return getClassName(baseClass, modifiers);
  };

  render() {
    const toolClassName = this.getClassName();

    return (
      <div
        className={toolClassName}
        onClick={this.handleClick}
        data-test="tool"
      >
        <img src={this.props.icon} alt="tool" className="paint__tool__icon" />
      </div>
    );
  }
}

export default withContext(Tool, "paint");
