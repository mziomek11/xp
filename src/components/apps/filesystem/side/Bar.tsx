import React, { Component } from "react";

import Details from "./Details";
import FileAndFolderTasks from "./fileandfolder/FileAndFolderTasks";
import withContext from "../../../../hoc/withContext";
import { WindowContextType } from "ContextType";

type Props = {
  context: WindowContextType;
};

const minWithToRender = 420;

export class Bar extends Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const { width } = this.props.context;
    if (width < minWithToRender && nextProps.context.width >= minWithToRender) {
      return true;
    }

    if (nextProps.context.width < minWithToRender && width >= minWithToRender) {
      return true;
    }

    return false;
  }
  render() {
    const shouldRender = this.props.context.width >= minWithToRender;

    if (!shouldRender) return null;

    return (
      <div className="filesystem__side__bar" data-test="container">
        <FileAndFolderTasks data-test="tasks" />
        <Details data-test="details" />
      </div>
    );
  }
}

export default withContext(Bar, "window");
