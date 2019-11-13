import React, { Component } from "react";

import Item from "./Item";
import withContext from "../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { FileType } from "../../../../store/filesystem/models";
import { areArraysEqual } from "../../../../utils";

type Props = {
  filesystem: FilesystemContextType;
};

export class Details extends Component<Props, {}> {
  shouldComponentUpdate({ filesystem }: Props) {
    const { path, focused } = this.props.filesystem;

    if (!areArraysEqual(path, filesystem.path)) return true;
    if (!areArraysEqual(focused, filesystem.focused)) return true;

    return false;
  }

  getFileInfo = (): [string, string] => {
    const { focused, path, files } = this.props.filesystem;

    if (focused.length === 0) {
      if (path.length === 0) return ["Computer", "System folder"];
      else if (path.length === 1) return [path[0], "Local disk"];
      return [path[path.length - 1], "File folder"];
    }

    if (focused.length === 1) {
      const fileName = focused[0];
      const fileType = files.filter(file => file.name === fileName)[0].type;
      const paragraph = this.mapFileTypeToParagraph(fileType);

      return [fileName, paragraph];
    }

    return ["", `Selected elements: ${focused.length}.`];
  };

  mapFileTypeToParagraph = (type: FileType): string => {
    switch (type) {
      case "disk":
        return "Local disk";
      case "folder":
        return "File folder";
      case "text":
        return "Text document";
      case "image":
        return "Image";
      default:
        throw Error("Unknown file type");
    }
  };

  render() {
    const [heading, paragraph] = this.getFileInfo();

    return (
      <Item title="Details" data-test="container">
        <h5 className="filesystem__side__content__heading">{heading}</h5>
        <p> {paragraph}</p>
      </Item>
    );
  }
}

export default withContext(Details, "filesystem");
