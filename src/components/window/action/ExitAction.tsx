import React, { Component } from "react";

import Action from "./Action";
import { WindowContextType } from "ContextType";
import { withWindowContext } from "../../../hoc";

type Props = {
  context: WindowContextType;
};

export class ExitAction extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { close } = this.props.context;
    return <Action type="exit" onClick={close} data-test="action" />;
  }
}

export default withWindowContext(ExitAction);
