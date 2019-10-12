import React, { Component } from "react";

import Action from "./Action";
import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  window: WindowContextType;
};

export class MinimalizeAction extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { toggleMinimalize } = this.props.window;
    return (
      <Action type="minimalize" onClick={toggleMinimalize} data-test="action" />
    );
  }
}

export default withContext(MinimalizeAction, "window");
