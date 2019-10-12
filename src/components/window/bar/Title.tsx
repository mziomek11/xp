import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  window: WindowContextType;
};

export class Title extends Component<Props, {}> {
  shouldComponentUpdate({ window }: Props) {
    if (this.props.window.staticWindowName) return false;
    return this.props.window.name !== window.name;
  }

  render() {
    const { staticWindowName, name } = this.props.window;
    return (
      <h4 className="window__title" data-test="title">
        {staticWindowName ? staticWindowName : name}
      </h4>
    );
  }
}

export default withContext(Title, "window");
