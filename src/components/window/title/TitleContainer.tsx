import React, { Component } from "react";

import FilesystemTitle from "./Filesystem";
import withContext from "../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
};

export class TitleContainer extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.context.application !== nextProps.context.application;
  }

  render() {
    const { application } = this.props.context;
    if (application === "Filesystem") {
      return <FilesystemTitle data-test="filesystem" />;
    } else throw Error("Application does not exists");
  }
}

export default withContext(TitleContainer, "window");
