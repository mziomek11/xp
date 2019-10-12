import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  window: WindowContextType;
};

export class Icon extends Component<Props, {}> {
  shouldComponentUpdate({ window }: Props) {
    return this.props.window.icon !== window.icon;
  }

  render() {
    const { icon } = this.props.window;

    return (
      <div className="window__icon-container" data-test="container">
        <img
          src={icon}
          className="window__icon"
          alt="app icon"
          data-test="icon"
        />
      </div>
    );
  }
}

export default withContext(Icon, "window");
