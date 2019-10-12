import React, { Component } from "react";

import Location from "./Location";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { areObjectsEqual } from "../../../../utils";

type Props = { filesystem: FilesystemContextType };

export class Bar extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const currOptions = this.props.filesystem.options;
    const values = ["showAdressBar"];

    return !areObjectsEqual(currOptions, filesystem.options, values);
  }
  render() {
    const { showAdressBar } = this.props.filesystem.options;
    if (!showAdressBar) return null;

    return (
      <div className="filesystem__adress__bar" data-test="container">
        <span className="filesystem__adress__text" data-test="text">
          Adress
        </span>
        <Location data-test="location" />
      </div>
    );
  }
}

export default withContext(Bar, "filesystem");
