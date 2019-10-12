import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

import Navigation from "./navigation/Navigation";
import Folders from "./Folders";
import Views from "./Views";

type Props = { filesystem: FilesystemContextType };

export class Bar extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const currOptions = this.props.filesystem.options;
    const values = ["showActionBar"];

    return !areObjectsEqual(currOptions, filesystem.options, values);
  }
  render() {
    const { showActionBar } = this.props.filesystem.options;
    if (!showActionBar) return null;

    return (
      <div className="filesystem__action__bar" data-test="bar">
        <Navigation data-test="navigation" />
        <Folders data-test="folders" />
        <Views data-test="views" />
      </div>
    );
  }
}

export default withContext(Bar, "filesystem");
