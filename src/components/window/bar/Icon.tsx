import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
};

export class Icon extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    return this.props.context.icon !== context.icon;
  }

  render() {
    const { icon } = this.props.context;
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
