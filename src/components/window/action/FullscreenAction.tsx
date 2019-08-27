import React, { Component } from "react";

import Action from "./Action";
import { WindowContextType } from "ContextType";
import { withWindowContext } from "../../../hoc";

type Props = {
  context: WindowContextType;
};

export class FullscreenAction extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  handleClick = () => {
    const { fullscreened, setContext } = this.props.context;
    setContext({ fullscreened: !fullscreened });
  };

  render() {
    return (
      <Action type="fullscreen" onClick={this.handleClick} data-test="action" />
    );
  }
}

export default withWindowContext(FullscreenAction);
