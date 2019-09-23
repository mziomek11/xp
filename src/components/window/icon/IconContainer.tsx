import React, { Component } from "react";

import FilesystemIcon from "./Filesystem";
import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
};

export class IconContainer extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.context.application !== nextProps.context.application;
  }

  render() {
    const { application } = this.props.context;

    if (application === "Filesystem") {
      return <FilesystemIcon data-test="filesystem" />;
    } else throw Error("Application does not exists");
  }
}

export default withContext(IconContainer, "window");
