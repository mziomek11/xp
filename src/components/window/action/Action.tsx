import React, { Component } from "react";

import withWindowContext from "../../../hoc/withWindowContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
  type: "exit" | "minimalize" | "fullscreen";
  onClick: () => void;
};

export class Action extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  handleClick = () => {
    const { onClick, context, type } = this.props;

    onClick();
    if (type !== "exit") context.changePriority();
  };

  render() {
    return (
      <div
        className={`window__action window__action--${this.props.type}`}
        onClick={this.handleClick}
        data-test="action"
      />
    );
  }
}

export default withWindowContext(Action);
