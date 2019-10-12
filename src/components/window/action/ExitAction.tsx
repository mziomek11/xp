import React, { Component } from "react";

import Action from "./Action";
import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  window: WindowContextType;
};

export class ExitAction extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { close } = this.props.window;
    return <Action type="exit" onClick={close} data-test="action" />;
  }
}

export default withContext(ExitAction, "window");
