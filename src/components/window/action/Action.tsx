import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  window: WindowContextType;
  type: "exit" | "minimalize" | "fullscreen";
  onClick: () => void;
};

export class Action extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  handleClick = () => {
    const { onClick, window, type } = this.props;

    onClick();
    if (type === "fullscreen") window.changePriority();
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

export default withContext(Action, "window");
