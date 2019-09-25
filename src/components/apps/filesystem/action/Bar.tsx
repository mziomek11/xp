import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

import Navigation from "./navigation/Navigation";
import Folders from "./Folders";
import Views from "./Views";

type Props = { context: FilesystemContextType };

export class Bar extends Component<Props, {}> {
  shouldComponentUpdate({ context }: Props) {
    const currOptions = this.props.context.options;
    const values = ["showActionBar"];

    return !areObjectsEqual(currOptions, context.options, values);
  }
  render() {
    const { showActionBar } = this.props.context.options;
    if (!showActionBar) return null;

    return (
      <div className="filesystem__action-bar" data-test="bar">
        <Navigation data-test="navigation" />
        <Folders data-test="folders" />
        <Views data-test="views" />
      </div>
    );
  }
}

export default withContext(Bar, "filesystem");
