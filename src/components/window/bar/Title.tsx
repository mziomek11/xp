import React, { Component } from "react";

import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
};

export class Title extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    return this.props.context.name !== context.name;
  }

  render() {
    return (
      <h4 className="window__title" data-test="title">
        {this.props.context.name}
      </h4>
    );
  }
}

export default withContext(Title, "window");
