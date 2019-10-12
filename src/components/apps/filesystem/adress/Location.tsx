import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import Location from "../../../location/Location";
import { FilesystemContextType } from "ContextType";
import { areArraysEqual } from "../../../../utils";

type Props = {
  filesystem: FilesystemContextType;
};

export class AdressLocation extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const { path, historyPosition } = this.props.filesystem;
    if (!areArraysEqual(path, filesystem.path)) return true;
    if (historyPosition !== filesystem.historyPosition) return true;

    return false;
  }
  render() {
    const { setPath, path, historyPosition } = this.props.filesystem;
    return (
      <Location
        setPath={setPath}
        path={path}
        historyPosition={historyPosition}
        editable
        withGoButton
        data-test="location"
      />
    );
  }
}

export default withContext(AdressLocation, "filesystem");
